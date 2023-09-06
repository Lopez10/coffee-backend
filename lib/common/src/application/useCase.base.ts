export interface UseCaseBase<IRequest, IResponse> {
  run(request?: IRequest): IResponse;
}
