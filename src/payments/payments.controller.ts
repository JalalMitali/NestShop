import { Body, Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { stripe } from './constants';
import { PaymentClientDto } from './dto/payment-client.dto';
import { PaymentIntentDto } from './dto/payment-intent.dto';
import { UpdateIntentDto } from './dto/update-intent.dto';

@Controller('payments')
export class PaymentsController {
    stripe = require('stripe')(stripe)
    
    @UseGuards(JwtAuthGuard)
    @Post('/session')
    async session(@Body() intent: PaymentIntentDto, @Response() res) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: intent.amount,
            currency: intent.currency,
            automatic_payment_methods: {enabled: true},
          });
        res.send(paymentIntent)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    async update(@Body() update: UpdateIntentDto, @Response() res) {
        const intent = await this.stripe.paymentIntents.update(
            update.paymentIntentId,
            update.data
          );
        res.json({status: intent.status});
    }

    @UseGuards(JwtAuthGuard)
    @Post('/secret')
    async secret(@Body() payment: PaymentClientDto, @Response() res) {
      console.log(payment.paymentId);
      
        const paymentIntent = await this.stripe.paymentIntents.retrieve(
            payment.paymentId
          );
        res.json({client_secret: paymentIntent.client_secret});
    }
}
