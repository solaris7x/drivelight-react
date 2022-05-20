interface LoadingDivProps {
  text?: string;
}

const LoadingDiv = ({ text }: LoadingDivProps) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <div className="text-3xl font-bold text-center">{text || "Loading"}</div>
      <img src="/Loader.svg" width="30%" alt="" />
    </div>
  );
};
export default LoadingDiv;
