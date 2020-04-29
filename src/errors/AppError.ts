class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
    this.console();
  }

  console() {
    console.log('entrou no error', this.message, '  -  ', this.statusCode);
  }
}

export default AppError;
