import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ResultDiagram = () => {
    const [studentData, setStudentData] = useState([]); // Student evaluation data
    const [departmentData, setDepartmentData] = useState([]); // Department evaluation data
    const [academicDeanData, setAcademicDeanData] = useState(null); // Academic Dean evaluation data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseReportData, setCourseReportData] = useState([]); // Data for all courses and reports
   
  


    useEffect(() => {
        const fetchDatas = async () => {
            try {
                // Fetch average evaluation scores for all reports of the teacher's courses
                const response = await fetch(
                    `http://localhost:8082/teach/teacherReportAverages`,
                    { credentials: "include" }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch report evaluation data");
                }

                const result = await response.json();
                setCourseReportData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDatas();
        const fetchData = async () => {
            try {
                // Fetch student evaluation data
                const studentResponse = await fetch("http://localhost:8082/teach/stud/average-score", {
                    credentials: "include",
                });

                if (!studentResponse.ok) {
                    throw new Error("Failed to fetch student evaluation data");
                }

                const studentResult = await studentResponse.json();
                setStudentData(studentResult);

                // Fetch department evaluation data
                const departmentResponse = await fetch("http://localhost:8082/teach/dept", {
                    credentials: "include",
                });

                if (!departmentResponse.ok) {
                    throw new Error("Failed to fetch department evaluation data");
                }

                const departmentResult = await departmentResponse.json();
                setDepartmentData(departmentResult);

                // Fetch Academic Dean evaluation data
                const academicDeanResponse = await fetch("http://localhost:8082/teach/academic-dean-evaluation", {
                    credentials: "include",
                });

                if (!academicDeanResponse.ok) {
                    const academicDeanResult = await academicDeanResponse.text(); 
                alert(academicDeanResult);
                    throw new Error("Failed to fetch Academic Dean evaluation data");
                }

                const academicDeanResult = await academicDeanResponse.json();
                setAcademicDeanData(academicDeanResult);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Function to calculate total score per course or department
    const calculateTotalScore = (criteriaScores) => {
        return Object.values(criteriaScores).reduce((sum, score) => sum + score, 0);
    };

    // Function to calculate average scores across all courses or departments
    const calculateAverageScores = (data) => {
        let totalCumulativeScore = 0;
        const criteriaSums = {};
        const criteriaCounts = {};

        Object.values(data).forEach((criteriaScores) => {
            Object.entries(criteriaScores).forEach(([criteria, score]) => {
                totalCumulativeScore += score; // Sum up all scores

                if (!criteriaSums[criteria]) {
                    criteriaSums[criteria] = 0;
                    criteriaCounts[criteria] = 0;
                }
                criteriaSums[criteria] += score;
                criteriaCounts[criteria] += 1;
            });
        });

        const averageCriteriaScores = Object.entries(criteriaSums).map(([criteria, totalScore]) => ({
            criteria,
            score: totalScore / criteriaCounts[criteria],
        }));

        const totalAverageScore = averageCriteriaScores.reduce((acc, item) => acc + item.score, 0);

        return { averageCriteriaScores, totalAverageScore };
    };

    // Calculate averages for student evaluations
    const { averageCriteriaScores: studentAverages, totalAverageScore: studentTotalAverage } = calculateAverageScores(studentData);

    // Calculate averages for department evaluations
    const { averageCriteriaScores: departmentAverages, totalAverageScore: departmentTotalAverage } = calculateAverageScores(departmentData);

    // Calculate the sum of Academic Dean score, student total average, and department total average
    const totalSum = (academicDeanData ? academicDeanData.score : 0) + studentTotalAverage + departmentTotalAverage;

    return (
        <div>
            {/* Summary Section at the Top */}
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "40px" }}>
                {/* Academic Dean Score */}
                <div style={{ background: "#FFD700", padding: "20px", borderRadius: "10px", textAlign: "center", width: "30%" }}>
                    <h3>Academic Dean Score</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {academicDeanData ? academicDeanData.score.toFixed(2) : "N/A"}
                    </p>
                </div>

                {/* Student Average Score */}
                <div style={{ background: "#82ca9d", padding: "20px", borderRadius: "10px", textAlign: "center", width: "30%" }}>
                    <h3>Student Average Score</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {studentTotalAverage.toFixed(2)}
                    </p>
                </div>

                {/* Department Average Score */}
                <div style={{ background: "#FF8042", padding: "20px", borderRadius: "10px", textAlign: "center", width: "30%" }}>
                    <h3>Department Average Score</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {departmentTotalAverage.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Total Sum Badge */}
            <div style={{ marginBottom: "40px", textAlign: "center" }}>
                <span style={{ background: "#2196F3", color: "white", padding: "15px 30px", borderRadius: "15px", fontWeight: "bold", fontSize: "20px" }}>
                    Total Sum: {totalSum.toFixed(2)}
                </span>
            </div>

            <h2 className="text-center text-secondary">Student Evaluation Results</h2>

            {studentData && Object.keys(studentData).length > 0 ? (
    Object.entries(studentData).map(([courseName, criteriaScores]) => {
        const totalScore = calculateTotalScore(criteriaScores);
        return (
            <div key={courseName} style={{ marginBottom: "40px" }}>
                <h3 className="text-center m-3">{courseName}</h3>
                <ResponsiveContainer width="100%" height={800}>
                    <BarChart
                        layout="vertical"
                        data={Object.entries(criteriaScores).map(([criteria, score]) => ({
                            criteria,
                            score,
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 4]} />
                        <YAxis
                            dataKey="criteria"
                            type="category"
                            width={120}
                            tickFormatter={(value) =>
                                value.length > 10 ? value.substring(0, 10) + "..." : value
                            }
                        />
                        <Tooltip
                            formatter={(value) => `Score: ${value}`}
                            labelFormatter={(label) => `Criteria: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="score" fill="#8884d8" name="Average Score" />
                    </BarChart>
                </ResponsiveContainer>
                {/* Total Score Badge Below Each Course */}
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <span
                        style={{
                            background: "#4CAF50",
                            color: "white",
                            padding: "8px 15px",
                            borderRadius: "15px",
                            fontWeight: "bold",
                        }}
                    >
                        Total Score: {totalScore.toFixed(2)}
                    </span>
                </div>
            </div>
        );
    })
) : (
    <div className="text-center fs-2 fw-bold m-3 text-warning">
        No evaluation Yet
    </div>
)}

            {/* Overall Student Average Chart */}
            <h2 className="text-center text-secondary">Overall Student Average Scores Across All Courses</h2>
{studentAverages && studentAverages.length > 0 ? (
    <ResponsiveContainer width="100%" height={800}>
        <BarChart
            layout="vertical"
            data={studentAverages}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 4]} />
            <YAxis
                dataKey="criteria"
                type="category"
                width={120}
                tickFormatter={(value) =>
                    value.length > 10 ? value.substring(0, 10) + "..." : value
                }
            />
            <Tooltip
                formatter={(value) => `Score: ${value}`}
                labelFormatter={(label) => `Criteria: ${label}`}
            />
            <Legend />
            <Bar dataKey="score" fill="#82ca9d" name="Overall Average Score" />
        </BarChart>
    </ResponsiveContainer>
) : (
    <div className="text-center fs-2 fw-bold m-3 text-warning">
        No evaluation Yet
    </div>
)}

            {/* Total Student Average Score Badge */}
            <div className="text-center m-3">
                <span style={{ background: "#FF9800", color: "white", padding: "8px 15px", borderRadius: "15px", fontWeight: "bold" }}>
                    Total Student Average Score: {studentTotalAverage.toFixed(2)}
                </span>
            </div>

            <h2 className="text-center text-secondary">Department Evaluation Results</h2>

            {Object.keys(departmentData).length === 0 ? (
    <div className="text-center fs-2 fw-bold m-3 text-warning">
        No evaluation Yet
    </div>
) : (
    Object.entries(departmentData).map(([departmentName, criteriaScores]) => {
        const totalScore = calculateTotalScore(criteriaScores);
        return (
            <div key={departmentName} style={{ marginBottom: "40px" }}>
                <h3 className="text-center text-secondary m-3">{departmentName}</h3>
                <ResponsiveContainer width="100%" height={800}>
                    <BarChart
                        layout="vertical"
                        data={Object.entries(criteriaScores || {}).map(([criteria, score]) => ({
                            criteria,
                            score,
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 4]} />
                        <YAxis 
                            dataKey="criteria" 
                            type="category" 
                            width={120} 
                            tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + "..." : value} 
                        />
                        <Tooltip formatter={(value) => `Score: ${value}`} labelFormatter={(label) => `Criteria: ${label}`} />
                        <Legend />
                        <Bar dataKey="score" fill="#FF8042" name="Average Score" />
                    </BarChart>
                </ResponsiveContainer>
                {/* Total Score Badge Below Each Department */}
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <span style={{ background: "#4CAF50", color: "white", padding: "8px 15px", borderRadius: "15px", fontWeight: "bold" }}>
                        Total Score: {totalScore ? totalScore.toFixed(2) : "No evaluation Yet"}
                    </span>
                </div>
            </div>
        );
    })
)}

<h2 className="text-center text-secondary">Overall Department Average Scores Across All Departments</h2>
{departmentAverages && departmentAverages.length > 0 ? (
    <ResponsiveContainer width="100%" height={800}>
        <BarChart
            layout="vertical"
            data={departmentAverages}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 4]} />
            <YAxis
                dataKey="criteria"
                type="category"
                width={120}
                tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + "..." : value}
            />
            <Tooltip formatter={(value) => `Score: ${value}`} labelFormatter={(label) => `Criteria: ${label}`} />
            <Legend />
            <Bar dataKey="score" fill="#FFBB28" name="Overall Average Score" />
        </BarChart>
    </ResponsiveContainer>
) : (
    <div className="text-center fs-2 fw-bold m-3 text-warning">
        No evaluation Yet
    </div>
)}

            {/* Total Department Average Score Badge */}
            <div style={{ marginTop: "10px", textAlign: "center" }}>
                <span style={{ background: "#FF9800", color: "white", padding: "8px 15px", borderRadius: "15px", fontWeight: "bold" }}>
                    Total Department Average Score: {departmentTotalAverage.toFixed(2)}
                </span>
            </div>

            {/* Academic Dean Evaluation Section */}
            <h2 className="text-center m-4 text-secondary">Academic Dean Evaluation</h2>
            {academicDeanData ? (
                <div style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", background: "#f9f9f9" }}>
                    <h3 className="text-center">Score: {academicDeanData.score}</h3>
                    <p style={{ fontSize: "16px", color: "#555" }}>
                        <strong>Remark:</strong> {academicDeanData.remark}
                    </p>
                </div>
            ) : (
                <p>No Academic Dean evaluation found.</p>
            )}

{courseReportData && courseReportData.length > 0 ? (
    courseReportData.map((courseMap, index) => {
        const courseName = Object.keys(courseMap)[0]; // Get the course name
        const reports = courseMap[courseName]; // Get the list of reports

        return (
            <div key={index} style={{ marginBottom: "40px" }}>
                <h3>{courseName}</h3>
               
                    <ResponsiveContainer width="100%" height={700}>
                        <BarChart
                            layout="vertical"
                            data={reports.map((report) => ({
                                topic: report.topicCovered,
                                score: report.averageScore,
                                method: report.styleOfTeaching
                            }))}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 4]} />
                            <YAxis
                                dataKey="topic"
                                type="category"
                                width={120}
                                tickFormatter={(value) =>
                                    value.length > 10
                                        ? value.substring(0, 10) + "..."
                                        : value
                                }
                            />
                            <Tooltip
                                formatter={(value) => `Score : ${value}`}
                                labelFormatter={(label) => `Topic Covered: ${label}`}
                            />
                            <Legend />
                            <Bar dataKey="score" fill="#8884d8" name="Average Score" />
                        </BarChart>
                    </ResponsiveContainer>
                
            </div>
        );
    })
) : (
    <p className="text-center fs-2 fw-bold m-4 text-warning">No Report Evaluation yet</p>
)}
  </div>
       
    );
    
};

export default ResultDiagram;