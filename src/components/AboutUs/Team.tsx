import { Badge, Empty, Flex, Skeleton } from "antd";
import { FaGithub, FaLinkedin, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { FaFacebook } from "react-icons/fa";
import {
  FacebookFilled,
  LinkedinFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import CommonSectionBannerTwo from "../helpingCompo/CommonSectionBannerTwo";

const Team = () => {
  const isLoadingTeam = false;
  const team = [
    {
      name: "Alice Johnson",
      role: "CEO",
      image:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Bob Smith",
      role: "CTO",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Catherine Lee",
      role: "CMO",
      image:
        "https://png.pngtree.com/png-vector/20190704/ourmid/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "David Kim",
      role: "CFO",
      image:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720828800&semt=ais_user",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Mr Smith",
      role: "TFO",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGZJiVjkYNcKy7wX1h1Rz-5Hjgn6wn4S9Jw&s",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "David Gilmour",
      role: "TSO",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSER4v2cR1C2eKmJojQsWOy31jp224Zo4EPZt5rWH0MxGxTzo-XOm-pbhlbzYg-7ce8p34&usqp=CAU",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
  ];



  const renderTeamMember = (team: any, ind: any) => (
    <div
      key={ind}
      className="shadow-lg hover:shadow-2xl rounded-lg relative group p-[2px] !mb-24 bg-gradient-to-b from-primary to-warning"
    >
      <div className="bg-white rounded-lg p-2">
        <div className="flex items-center justify-center  relative -translate-y-24">
          <div className="border-b-2 border-primary bg-white rounded-full p-2">
            <div className="bg-secondary-100 rounded-full p-3 border-2 border-warning ">
              <div className="w-44 h-44 border-2 rounded-full border-primary">
                <img
                  className="w-full h-full rounded-full"
                  src={team?.image}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-slate-700 -mt-14 pb-10 space-y-2">
          <h1 className="text-xl font-semibold">{team.name}</h1>
          <h2 className="text-[#8C8C8C]">{team.role}</h2>
          <p className="text-normal-desc">
            Our genius team member {team?.name} adds creativity and expertise,
            ensuring innovative solutions and exceptional results for every
            project.
          </p>
        </div>

        <div className="text-center py-2">
          {Object.keys(team.social)?.map((social, index) => (
            <Link
              key={index}
              to={team?.social?.[social]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gray p-1 rounded-md mx-1 hover:border hover:border-primary"
            >
              {social === "linkedin" && (
                <LinkedinFilled className="text-gray hover:text-warning" />
              )}
              {social === "twitter" && (
                <TwitterCircleFilled className="text-gray hover:text-warning" />
              )}
              {social === "facebook" && (
                <FacebookFilled className="text-gray hover:text-warning" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="my-container space-y-12">
        <CommonSectionBannerTwo
          title={"Meet Our Team"}
          subTitle={
            "Meet our dedicated team driving the success of our e-commerce platform"
          }
        />

        {isLoadingTeam ? (
          <Skeleton.Button active={true} block={true} className="!h-[200px]" />
        ) : !team.length ? (
          <div className="h-[200px] flex items-center justify-center">
            <Empty description={"Team not found"} />
          </div>
        ) : (
          <>
            {
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-16">
                {team?.map(renderTeamMember)}
              </div>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default Team;
