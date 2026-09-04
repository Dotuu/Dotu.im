interface spacerProps {
  margin?: string;
}

export const Spacer = ({ margin }: spacerProps) => {
  return <div className="spacer" style={margin ? { margin } : undefined}></div>;
};
