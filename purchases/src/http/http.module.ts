import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import path from 'node:path';
import {
  ApolloDriver,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from 'src/services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomerService } from 'src/services/customer.service';
import { CustomerResolver } from './graphql/resolvers/customer.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomerResolver,

    // Services
    ProductsService,
    PurchasesService,
    CustomerService,
  ],
})
export class HttpModule {}
