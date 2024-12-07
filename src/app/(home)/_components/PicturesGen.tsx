import { Card, CardContent } from "@/components/ui/card";

const PicturesGen = ({}) => {
  return (
    <Card className="w-full max-w-screen-xl py-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto divide-gray divide-x">
        <CardContent>1</CardContent>
        <CardContent>2</CardContent>
        <CardContent>3</CardContent>
      </div>
    </Card>
  );
};

export default PicturesGen;
