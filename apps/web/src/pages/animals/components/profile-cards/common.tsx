interface InfoItemProps {
  label: string;
  value: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex flex-row gap-10 items-center">
    <span className="text-md font-medium text-muted-foreground">{label}: </span>
    <span className="text-base font-medium">{value}</span>
  </div>
);
