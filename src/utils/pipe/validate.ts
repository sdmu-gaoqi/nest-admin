import {
  ArgumentMetadata,
  Injectable,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe extends ValidationPipe {
  async transform(value: any, metaData: ArgumentMetadata) {
    try {
      return await super.transform(value, metaData);
    } catch (err) {
      const response = err?.response;
      const message = err?.message;
      if (response.message) {
        throw new UnprocessableEntityException(
          this.handleError(response.message[0]),
        );
      }
      // 这会抛出422错误
      throw new UnprocessableEntityException(this.handleError(message));
    }
  }

  private handleError(errors) {
    return errors;
  }
}
