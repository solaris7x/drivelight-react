interface ErrorDivProps {
  message?: string;
}

const ErrorDiv = (props: ErrorDivProps) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <div className="text-3xl font-bold text-center">Something Broke</div>
      <div className="font-semibold text-center">{props.message}</div>
      <img src="/burn.jpg" width="40%" alt="" />
    </div>
  );
};
export default ErrorDiv;
