import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";
  import { FaReddit, FaNewspaper } from 'react-icons/fa';

  export function Tables({ topData, tabIndex }) {
    if(!topData) topData = [];
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Top Posts
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["title", "source"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topData.map(
                  ({ title, url }, key) => {
                    const className = `py-3 px-5 ${
                      key === topData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={title} style={{ minHeight: '50px' }}>
                         <a href={url}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {title}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        </a>
                        <td className={className}>
                       { tabIndex == 1 ? <FaNewspaper className="py-0.5 px-2 text-[11px] font-small w-fit" color="blue" size="2.5em" /> :  <FaReddit className="py-0.5 px-2 text-[11px] font-small w-fit" color="red" size="2.5em" />}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default Tables;