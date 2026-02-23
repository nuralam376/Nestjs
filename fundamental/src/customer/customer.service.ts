import { Injectable } from "@nestjs/common";
import { Customer } from "./interfaces/customer.interface";
import { CreateCustomerDto } from "./dto/create-customer.dto";

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  getAllCustomers(): Customer[] {
    return this.customers;
  }

  createCustomer(createCustomerDto: CreateCustomerDto): Customer {
    const newCustomer: Customer = {
      id: this.customers.length + 1,
      ...createCustomerDto,
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }
}
