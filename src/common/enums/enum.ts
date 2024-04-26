export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Latter = 4,
}

export enum ResultCode {
  Succeeded = 0,
  Error = 1,
  Captcha = 10,
}
