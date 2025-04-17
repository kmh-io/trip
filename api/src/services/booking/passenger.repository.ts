import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';

@Injectable()
export class PassengerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePassengerDto) {
    const { bookingId, ...passengerData } = data;
    const booking = this.prisma.connectId(bookingId);

    return this.prisma.passenger.create({
      data: {
        ...passengerData,
        booking,
      },
    });
  }

  async createMany(passengers: CreatePassengerDto[]) {
    return Promise.all(
      passengers.map((passenger) => {
        const { bookingId, ...passengerData } = passenger;
        const booking = this.prisma.connectId(bookingId);
        return this.prisma.passenger.upsert({
          where: { idNumber: passenger.idNumber },
          update: {
            ...passengerData,
            booking,
          },
          create: {
            ...passengerData,
            booking,
          },
        });
      }),
    );
    // return this.prisma.passenger.createMany({
    //   data: data.map((passenger) => ({
    //     ...passenger,
    //     booking: this.prisma.connectId(passenger.bookingId),
    //   })),
    //   skipDuplicates: true,
    // });
  }

  async findById(id: string) {
    return this.prisma.passenger.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.passenger.update({
      where: { id },
      data,
    });
  }
}
