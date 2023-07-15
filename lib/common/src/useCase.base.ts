export interface UseCase<IRequest, IResponse> {
  run(request?: IRequest): IResponse;
}
