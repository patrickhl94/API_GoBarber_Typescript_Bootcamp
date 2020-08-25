export default interface IMailPovider {
  sendMail(to: string, body: string): Promise<void>;
}
