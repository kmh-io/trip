import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateContactDetailsDto } from './dto/create-contack-details.dto';
import { ContactDetailsDto } from './dto/contact-details.dto';

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ContactDetailsDto) {
    return this.prisma.contact.create({
      data,
    });
  }

  async findById(id: string) {
    return this.prisma.contact.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.contact.findFirst({
      where: {
        email: email,
        deletedAt: null,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.contact.update({
      where: { id },
      data,
    });
  }
}
