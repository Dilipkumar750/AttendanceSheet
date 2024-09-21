import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResume, viewResume } from "../../store/resumeuplader/resumeuploader";
import { TbCaretDownFilled } from "react-icons/tb";
import { BiCaretUp } from "react-icons/bi";
import moment from 'moment'
import { Button, Modal } from 'antd';


function ResumeList() {
  const [searchedjobTitle, setSearchedJobTitle] = useState("");
  // test show more and show less
  const [showMoreToggle, setShowMoreToggle] = useState([]);
  // modal toggle
  const [modal2Open, setModal2Open] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');


  const dispatch = useDispatch();
  const { data: getData } = useSelector(
    (state) => state.resumeupload.getAllResume
  );

  useEffect(() => {
    dispatch(getAllResume());
  }, [dispatch]);

  //   show more and show less
  useEffect(() => {
    if (getData) {
      setShowMoreToggle(getData.map(() => false));
    }
  }, [getData]);

  if (!Array.isArray(getData)) {
    return <p>No resumes found</p>;
  }

  // Filter logic
  // const filteredData =
  //     getData?.filter((item) => {
  //         const currentJobMatch = item.workExperiences.some((data) => (
  //             data.jobTitle
  //             ? data.jobTitle.toLowerCase().includes(searchedjobTitle.toLowerCase())
  //             : false
  //         )
  //     );
  //     return currentJobMatch;
  // }) || [];

  const filteredData = searchedjobTitle
    ? getData?.filter((item) => {
      const currentJobMatch = item.workExperiences.some((data) =>
        data.jobTitle
          ? data.jobTitle
            .toLowerCase()
            .includes(searchedjobTitle.toLowerCase())
          : false
      );
      return currentJobMatch;
    }) || []
    : getData || [];

  const handleToggleShowMore = (index) => {
    setShowMoreToggle((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  // view resume on iframe
  const handleViewResume = async (id) => {
    setModal2Open(true);
    try {
      const blob = await dispatch(viewResume(id)).unwrap();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.log("error: ", error);
    }
  };


  return (
    <div>
      <div className="overflow-x-auto ">
        <table>
          <thead className="text-white text-sm uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Upload Date
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                <div>Job Title</div>
                <div className="w-40">
                  <form className="flex items-center justify-center p-2">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-black"
                      value={searchedjobTitle}
                      onChange={(e) => setSearchedJobTitle(e.target.value)}
                    />
                  </form>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Degree
              </th>
              <th scope="col" className="px-6 py-3">
                Skills
              </th>
              <th scope="col" className="px-6 py-3">
                Summary
              </th>
              <th scope="col" className="px-6 py-3">
                Url
              </th>
              <th scope="col" className="px-6 py-3">
                Job Date
              </th>
              <th scope="col" className="px-6 py-3">
                Job Descriptions
              </th>
              <th scope="col" className="px-6 py-3">
                School
              </th>
              <th scope="col" className="px-6 py-3">
                Digree Date
              </th>
              <th scope="col" className="px-6 py-3">
                Digree Gpa
              </th>
              <th scope="col" className="px-6 py-3">
                Digree Descriptions
              </th>
              <th scope="col" className="px-6 py-3">
                Project
              </th>
              <th scope="col" className="px-6 py-3">
                Project Date
              </th>
              <th scope="col" className="px-6 py-3">
                Project Descriptions
              </th>
              <th scope="col" className="px-6 py-3">
                Skills Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Skills Descriptions
              </th>
              <th scope="col" className="px-6 py-3">
                Descriptions
              </th>
              <th scope="col" className="px-6 py-3">
                show more
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="bg-white hover:text-white text-black text-[14px] border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-200 hover:bg-gray-500 ">
                <td className="p-2">{index + 1}</td>
                <td>{moment(item?.createdAt).format("DD/MMM/YY")}</td>
                <td className="p-2"><p className="w-40">{item.profile.name}</p></td>
                <td className="p-2">
                  {item.workExperiences && item.workExperiences.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.workExperiences.map((work, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{work.jobTitle}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>
                          {item.workExperiences[0]?.jobTitle?.substring(0, 10)}
                          ...
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">{item.profile.email}</td>
                <td className="p-2">
                  <div className="w-24">{item.profile.phone}</div>
                </td>
                <td className="p-2">{item.profile.location}</td>
                <td className="p-2">
                  {item.workExperiences && item.workExperiences.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.workExperiences.map((work, i) => (
                            <div key={i}>
                              <p>{work.company}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>
                          {item.workExperiences[0]?.company?.substring(0, 10)}
                          ...
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.educations && item.educations.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.educations.map((study, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{study.degree ? study.degree : "Null"}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{item.educations[0].degree.substring(0, 10)}...</p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.skills.featuredSkills &&
                    item.skills.featuredSkills > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.skills.featuredSkills.map((skill, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{skill.skill}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{item.skills[0].skill.substring(0, 10)}...</p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  <p className="w-40">
                    {showMoreToggle[index]
                      ? item.profile.summary
                      : `${item.profile.summary.substring(0, 20)}...`}
                  </p>
                </td>
                <td className="p-2">
                  <div>
                    {
                      showMoreToggle[index] ?
                        item.profile?.url || "Null"
                        :
                        <p>{item.profile?.url?.substring(0, 20)}...</p>
                    }
                  </div>
                </td>
                <td className="p-2">
                  {item.workExperiences && item.workExperiences.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.workExperiences.map((work, workIndex) => (
                            <div key={workIndex} className="flex gap-2">
                              <p className="text-red-500">{workIndex + 1}.</p>
                              <p>{work.date || "Null"}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>
                          {item.workExperiences[0].date?.substring(0, 10)}...
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>

                <td className="p-2">
                  {item.workExperiences && item.workExperiences.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {/* Show all work experiences */}
                          {item.workExperiences.map((work, workIndex) => (
                            <div key={workIndex} className="w-52">
                              {work.descriptions &&
                                work.descriptions.length > 0 ? (
                                work.descriptions.map(
                                  (description, descIndex) => (
                                    <div key={descIndex} className="flex gap-2">
                                      <p className="text-red-500">
                                        {workIndex + 1}.{descIndex + 1}.
                                      </p>
                                      <p>{description || "Null"}</p>
                                    </div>
                                  )
                                )
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          ))}
                        </>
                      ) : (
                        // Initially show just the first description, truncated
                        <p>
                          {item.workExperiences[0]?.descriptions[0]?.substring(
                            0,
                            10
                          )}
                          ...
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>

                <td className="p-2">
                  {item.educations && item.educations.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.educations.map((study, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{study.school ? study.school : "Null"}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{item.educations[0].school.substring(0, 10)}...</p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.educations && item.educations.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.educations.map((study, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{study.date}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{item.educations[0].date.substring(0, 10)}...</p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.educations && item.educations.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.educations.map((study, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{study.gpa ? study.gpa : "Null"}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{item.educations[0].gpa.substring(0, 10)}...</p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.educations && item.educations.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.educations.map((study, index) => (
                            <div className="w-52">
                              {study.description &&
                                study.description.length > 0 ? (
                                study.descriptions.map((t, i) => (
                                  <div className="flex gap-2">
                                    <p className="text-red-500">
                                      {index + 1}..{i + 1}
                                    </p>
                                    <p>{t}</p>
                                  </div>
                                ))
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>
                          {item.educations[0]?.descriptions[0]?.substring(
                            0,
                            10
                          )}
                          ...
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.projects && item.projects.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.projects.map((project, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>
                                {project.project ? project.project : "Null"}
                              </p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{item.projects[0].project.substring(0, 10)}...</p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.projects && item.projects.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.projects.map((project, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{project.data ? project.date : "Null"}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{item.projects[0].data?.substring(0, 10)}...</p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.projects && item.projects.length > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.projects.map((project, index) => (
                            <>
                              {project.descriptions.map((d, i) => (
                                <div className="flex gap-2">
                                  <p className="text-red-500">
                                    {index + 1}.{i + 1}.
                                  </p>
                                  <p>{d}</p>
                                </div>
                              ))}
                            </>
                          ))}
                        </>
                      ) : (
                        <p>
                          {item.projects[0].descriptions[0].substring(0, 10)}
                          ...
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.skills.featuredSkills &&
                    item.skills.featuredSkills > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.skills.featuredSkills.map((skill, index) => (
                            <div className="flex gap-2">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{skill.rating}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{item.skills[0]?.rating?.substring(0, 10)}...</p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.skills.descriptions && item.skills.descriptions > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.skills.descriptions.map((skill, index) => (
                            <div className="flex gap-2 w-44">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{skill}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>
                          {item.skills.descriptions[0]?.skill?.substring(0, 10)}
                          ...
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className="p-2">
                  {item.custom.descriptions && item.custom.descriptions > 0 ? (
                    <>
                      {showMoreToggle[index] ? (
                        <>
                          {item.custom.descriptions.map((skill, index) => (
                            <div className="flex gap-2 w-44">
                              <p className="text-red-500">{index + 1}.</p>
                              <p>{skill}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>
                          {item.custom.descriptions[0]?.substring(0, 10)}...
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Null</p>
                  )}
                </td>
                <td className=" text-center ">
                  <button
                    className="text-red-500 font-bold text-2xl"
                    onClick={() => handleToggleShowMore(index)}>
                    {showMoreToggle[index] ? (
                      <BiCaretUp />
                    ) : (
                      <TbCaretDownFilled />
                    )}
                  </button>
                </td>
                <td>
                  <Button onClick={() => handleViewResume(item.fileId)}>View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}
      <Modal
        centered
        open={modal2Open}
        width={'100%'}
        footer={
          <Button type="primary text-black" onClick={()=>setModal2Open(false)}>
            cancel
          </Button>
        }
      >
        <div ><iframe src={pdfUrl} frameborder="0" className="w-full h-[80vh]"></iframe></div>
      </Modal>
    </div>
  );
}

export default ResumeList;
