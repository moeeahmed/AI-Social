import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type InsightsProps = {
  mediaId: string;
};

const Insights: React.FC<InsightsProps> = ({ mediaId }) => {
  const [impressions, setimpressions] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/instagram/insights", {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Set content type for JSON
          },
          body: JSON.stringify({ mediaId }), // Pass mediaId in the body
        });

        const response = await res.json();

        if (!res.ok) {
          throw new Error(response.data);
        }

        const { data } = response;

        console.log(response.impressions.values[0].value);

        setimpressions(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return <>{impressions && <div>{`impressions = ${impressions}`}</div>}</>;
};

export default Insights;
