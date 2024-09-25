import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';

@Controller()
export class ProductListener {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern({ cmd: 'search.products' })
  async handleSearch(@Payload() data: { query: string }) {
    return await this.searchService.searchProducts(data.query);
  }
}
