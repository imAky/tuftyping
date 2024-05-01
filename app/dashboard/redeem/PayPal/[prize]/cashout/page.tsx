import { fetchUsertotalPoints } from "@/app/lib/action";
import { ReImage, ReProgress } from "@/app/ui/dashboard/ReCom/ReCom";
import RedeemButton from "@/app/ui/dashboard/redeem/RedeemButton";
import { FaRupeeSign } from "react-icons/fa";
import { requiredPointsMap } from "@/app/utils/helpers";

export default async function Page({ params }: { params: { prize: string } }) {
  const { totalPoints } = await fetchUsertotalPoints();
  const prizeValues = ["50", "100", "250", "500"];
  const prize = prizeValues.includes(params.prize) ? params.prize : "50";

  const requiredPoints = requiredPointsMap[prize];

  const isRedeem = totalPoints >= requiredPoints;

  const progressPercentage = (totalPoints / requiredPoints) * 100;

  return (
    <div className="flex sm:flex-row flex-col gap-8 mb-52 mt-16 bg-gray-50 py-8 px-4 rounded-2xl">
      <div className="h-1/4 mx-2">
        <ReImage width={250} height={190} />
      </div>
      <div className="flex flex-col gap-4 w-3/4 mx-2">
        <div className="flex items-center text-black text-xl font-medium  tracking-wider">
          <FaRupeeSign className="h-4 w-4" />
          <span className=" text-2xl">{prize} PayPal</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-1/4 my-2">
            <div className="text-black ">
              {totalPoints} of {requiredPoints}
            </div>
            <div className="">
              <ReProgress progressPercentage={progressPercentage} />
            </div>
          </div>
          <RedeemButton isRedeem={isRedeem} prize={prize} />
        </div>

        <div className=" text-gray-500 my-4 text-lg font-medium tracking-wide">
          <p className="my-2 text-gray-800 tracking-wider font-medium ">
            For the quickest delivery of your payment, we recommend that your
            PayPal account email matches to the email registered for your
            account and your PayPal account needs to be verified.
          </p>
          <p className="my-8 text-gray-600 tracking-wider">
            If You don't have PayPal accoount then create one.
          </p>
          <p className="my-4 text-gray-500 tracking-wide">
            *While every attempt is made to process your redemption as soon as
            possible, rewards may take up to 48 hours to receive, although they
            usually arrive much sooner.
          </p>
        </div>
      </div>
    </div>
  );
}
