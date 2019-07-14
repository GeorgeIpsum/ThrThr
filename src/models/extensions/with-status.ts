import { IStateTreeNode } from 'mobx-state-tree';
import { observable, IObservableValue } from 'mobx';

export type StatusType = "idle" | "pending" | "done" | "error";

export const withStatus = (self: IStateTreeNode) => {
  let status: IObservableValue<string> = observable.box("idle");

  return {
    views: {
      get status() {
        return status.get() as StatusType;
      },
      set status(value: StatusType) {
        status.set(value);
      },
    },
    actions: {
      setStatus(value: StatusType) {
        status.set(value);
      },
    },
  };
}