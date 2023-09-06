export class ControllerBase {
  async runController(useCase: any, request?: any) {
    try {
      const result = await useCase.run(request);
      if (result.isLeft()) {
        return result.value.getErrorValue().message;
      }
      return result.value.getValue();
    } catch (error) {
      return error.message;
    }
  }
}
