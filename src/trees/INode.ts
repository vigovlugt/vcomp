export default interface INode<T> {
  data?: T;
  right?: INode<T>;
  left?: INode<T>;
  size: number;
}
