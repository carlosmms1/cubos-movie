import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDTO } from '../dtos/create-user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { MailService } from 'src/modules/shared/app/services/mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createUser(data: CreateUserDTO) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      return { message: 'E-mail já cadastrado.' };
    }

    const hashedPassword = await this.hash(data.password);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        emailConfirmed: false,
      },
    });

    const emailConfirmationToken = this.generateToken(user.id);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailConfirmationToken,
      },
    });

    await this.sendConfirmationEmail({
      name: user.name,
      email: user.email,
      token: emailConfirmationToken,
    });

    return {
      message:
        'Usuário cadastrado com sucesso! Por favor, verifique seu e-mail para confirmar.',
    };
  }

  async confirmEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      if (payload.type !== 'email-confirmation') {
        throw new Error('Token inválido!');
      }
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new Error('Usuário não encontrado!');
      }
      if (user.emailConfirmed) {
        return { message: 'E-mail já confirmado.' };
      }
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          emailConfirmed: true,
          emailConfirmationToken: null,
        },
      });
      return { message: 'E-mail confirmado com sucesso!' };
    } catch (e) {
      return { message: 'Token inválido ou expirado!', error: e.message };
    }
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  private async sendConfirmationEmail({
    name,
    email,
    token,
  }: {
    name: string;
    email: string;
    token: string;
  }) {
    const confirmUrl = `http://localhost:3000/users/confirm?token=${token}`;
    await this.mailService.sendMail({
      to: email,
      subject: 'Confirmação de e-mail',
      html: `<p>Olá, ${name}!</p><p>Confirme seu e-mail clicando <a href="${confirmUrl}">aqui</a>.</p>`,
    });
  }

  private generateToken(id: string): string {
    return this.jwtService.sign({
      sub: id,
      type: 'email-confirmation',
    });
  }

  private async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
