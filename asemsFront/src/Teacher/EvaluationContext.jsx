import React, { createContext, useContext, useEffect, useState } from 'react';

const EvaluationContext = createContext();

export const EvaluationProvider = ({ children }) => {
  const [studentData, setStudentData] = useState({});
  const [departmentData, setDepartmentData] = useState({});
  const [academicDeanData, setAcademicDeanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseReportData, setCourseReportData] = useState([]);
  const [activeRound, setActiveRound] = useState(0); // 0 = no active round, 1 = first round, 2 = second round

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // First fetch the active round
        const roundResponse = await fetch("http://localhost:8082/teach/round", { 
          credentials: "include" 
        });
        if (!roundResponse.ok) throw new Error("Failed to fetch active round");
        const currentRound = await roundResponse.json();
        setActiveRound(currentRound);

        // Then fetch all other data in parallel
        const [reportRes, studentRes, deptRes, deanRes] = await Promise.all([
          fetch("http://localhost:8082/teach/teacherReportAverages", { credentials: "include" }),
          fetch("http://localhost:8082/teach/stud/average-score", { credentials: "include" }),
          fetch("http://localhost:8082/teach/dept", { credentials: "include" }),
          fetch("http://localhost:8082/teach/academic-dean-evaluation", { credentials: "include" })
        ]);

        if (!reportRes.ok) throw new Error("Failed to fetch report data");
        if (!studentRes.ok) throw new Error("Failed to fetch student data");
        if (!deptRes.ok) throw new Error("Failed to fetch department data");

        setCourseReportData(await reportRes.json());
        setStudentData(await studentRes.json());
        setDepartmentData(await deptRes.json());

        // Academic Dean data is optional
        if (deanRes.ok) {
          setAcademicDeanData(await deanRes.json());
        }
      } catch (error) {
        setError(error.message);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Helper function to calculate average scores for each criteria across all courses/departments
  const calculateAverageScores = (data) => {
    const criteriaSums = {};
    const criteriaCounts = {};
    let totalCumulativeScore = 0;

    Object.values(data).forEach(criteriaScores => {
      Object.entries(criteriaScores || {}).forEach(([criteria, score]) => {
        if (typeof score !== 'number') return;
        
        totalCumulativeScore += score;
        criteriaSums[criteria] = (criteriaSums[criteria] || 0) + score;
        criteriaCounts[criteria] = (criteriaCounts[criteria] || 0) + 1;
      });
    });

    const averageCriteriaScores = Object.entries(criteriaSums).map(([criteria, totalScore]) => ({
      criteria,
      score: totalScore / (criteriaCounts[criteria] || 1)
    }));

    const totalAverageScore = averageCriteriaScores.reduce((acc, item) => acc + item.score, 0);

    return { averageCriteriaScores, totalAverageScore };
  };

  // Calculate low scores based on active round thresholds
  const getLowScores = (data, type) => {
    if (!data || !activeRound || activeRound === 0) return [];
    
    const thresholds = {
      student: activeRound === 1 ? 2 : 1.2,
      department: activeRound === 1 ? 1.5 : 0.95
    };
    const threshold = type === 'student' ? thresholds.student : thresholds.department;

    let lowScores = [];
    
    Object.entries(data).forEach(([source, criteriaScores]) => {
      Object.entries(criteriaScores || {}).forEach(([criteria, score]) => {
        if (score < threshold) {
          lowScores.push({
            source,
            criteria,
            score
          });
        }
      });
    });

    return lowScores;
  };

  // Calculate all derived data
  const { averageCriteriaScores: studentAverages, totalAverageScore: studentTotalAverage } = calculateAverageScores(studentData);
  const { averageCriteriaScores: departmentAverages, totalAverageScore: departmentTotalAverage } = calculateAverageScores(departmentData);
  const totalSum = (academicDeanData?.score || 0) + studentTotalAverage + departmentTotalAverage;
  const studentLowScores = getLowScores(studentData, 'student');
  const departmentLowScores = getLowScores(departmentData, 'department');

  return (
    <EvaluationContext.Provider value={{
      // Raw data
      studentData,
      departmentData,
      academicDeanData,
      courseReportData,
      loading,
      error,
      activeRound,
      
      // Calculated averages
      studentAverages,
      studentTotalAverage,
      departmentAverages,
      departmentTotalAverage,
      totalSum,
      
      // Low scores
      studentLowScores,
      departmentLowScores,
      
      // Helper functions
      calculateTotalScore: (criteriaScores) => Object.values(criteriaScores || {}).reduce((sum, score) => sum + score, 0)
    }}>
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluation = () => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error('useEvaluation must be used within an EvaluationProvider');
  }
  return context;
};