import React, { createContext, useContext, useState, useEffect } from 'react';

const EvaluationContext = createContext();

export function EvaluationProvider({ children }) {
  const [teachers, setTeachers] = useState([]);
  const [overallAverage, setOverallAverage] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  useEffect(() => {
    fetchTeachers();
  }, []);

  const calculateOverallAverage = (teachersData) => {
    if (!teachersData || teachersData.length === 0) return 0;
    
    const total = teachersData.reduce((sum, teacher) => {
      const studentTotal = parseFloat(teacher.studentTotalAvgScore || 0);
      const deptTotal = parseFloat(teacher.deptTotalAvgScore || 0);
      const deanTotal = parseFloat(teacher.academicDeanEvaluation?.[0]?.score || 0);
      return sum + studentTotal + deptTotal + deanTotal;
    }, 0);
    
    return (total / teachersData.length).toFixed(2);
  };

  const fetchTeachers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch the list of all instructors
      const instructorResponse = await fetch("http://localhost:8082/ad/teacher", {
        method: "GET",
        credentials: "include",
      });
  
      if (!instructorResponse.ok) {
        const errorData = await instructorResponse.json();
        throw new Error(errorData.error || `HTTP error! Status: ${instructorResponse.status}`);
      }
  
      const instructors = await instructorResponse.json();
      if (!Array.isArray(instructors)) {
        throw new Error("Expected an array of instructors");
      }
  
      // Fetch student evaluation results for all instructors
      const studentEvalResponse = await fetch("http://localhost:8082/ad/evaluation-results/all", {
        method: "GET",
        credentials: "include",
      });
  
      if (!studentEvalResponse.ok) {
        const errorData = await studentEvalResponse.json();
        throw new Error(errorData.error || `HTTP error! Status: ${studentEvalResponse.status}`);
      }
  
      const studentEvalResults = await studentEvalResponse.json();
      if (typeof studentEvalResults !== "object" || studentEvalResults === null) {
        throw new Error("Expected an object for student evaluation results");
      }
  
      // Process all teachers with their evaluations
      const teachersWithDeptEvals = await Promise.all(
        instructors.map(async (teacher) => {
          // Fetch department head evaluation results
          const deptEvalResponse = await fetch(`http://localhost:8082/ad/department-evaluations/${teacher.id}`, {
            method: "GET",
            credentials: "include",
          });
  
          if (!deptEvalResponse.ok) {
            const errorData = await deptEvalResponse.json();
            throw new Error(errorData.error || `HTTP error! Status: ${deptEvalResponse.status}`);
          }
  
          const deptEvalResults = await deptEvalResponse.json();
          if (typeof deptEvalResults !== "object" || deptEvalResults === null) {
            throw new Error("Expected an object for department evaluation results");
          }
  
          // Fetch Academic Dean evaluation
          const academicDeanEvalResponse = await fetch(`http://localhost:8082/ad/adeval/${teacher.id}`, {
            method: "GET",
            credentials: "include",
          });
  
          if (!academicDeanEvalResponse.ok) {
            const errorData = await academicDeanEvalResponse.json();
            throw new Error(errorData.error || `HTTP error! Status: ${academicDeanEvalResponse.status}`);
          }
  
          const academicDeanEval = await academicDeanEvalResponse.json();
          if (!Array.isArray(academicDeanEval)) {
            throw new Error("Expected an array for academic dean evaluation");
          }
  
          // Calculate student evaluation averages
          const studentCriteriaScores = {};
          Object.values(studentEvalResults[teacher.username] || {}).forEach((criteria) => {
            Object.entries(criteria).forEach(([criterion, score]) => {
              if (!studentCriteriaScores[criterion]) {
                studentCriteriaScores[criterion] = [];
              }
              studentCriteriaScores[criterion].push(score);
            });
          });

          const studentAvgCriteriaScores = Object.entries(studentCriteriaScores).map(([criterion, scores]) => ({
            criterion,
            avgScore: (scores.reduce((sum, score) => sum + score, 0) / scores.length || 0).toFixed(2),
          }));

          const studentTotalAvgScore = studentAvgCriteriaScores
            .reduce((sum, { avgScore }) => sum + parseFloat(avgScore), 0)
            .toFixed(2);

          // Calculate department evaluation averages
          const deptCriteriaScores = {};
          Object.values(deptEvalResults || {}).forEach((department) => {
            Object.entries(department).forEach(([criterion, score]) => {
              if (!deptCriteriaScores[criterion]) {
                deptCriteriaScores[criterion] = [];
              }
              deptCriteriaScores[criterion].push(score);
            });
          });

          const deptAvgCriteriaScores = Object.entries(deptCriteriaScores).map(([criterion, scores]) => ({
            criterion,
            avgScore: (scores.reduce((sum, score) => sum + score, 0) / scores.length || 0).toFixed(2),
          }));

          const deptTotalAvgScore = deptAvgCriteriaScores
            .reduce((sum, { avgScore }) => sum + parseFloat(avgScore), 0)
            .toFixed(2);

          const academicDeanScore = academicDeanEval?.[0]?.score || 0;
          const academicDeanRemark = academicDeanEval?.[0]?.remark || "";
       
          // Combined total average score
          const combinedTotalAvgScore = (
            parseFloat(studentTotalAvgScore) +
            parseFloat(deptTotalAvgScore) +
            parseFloat(academicDeanScore)
          ).toFixed(2);

          return {
            ...teacher,
            studentEvaluationResults: studentEvalResults[teacher.username] || {},
            deptEvaluationResults: deptEvalResults,
            academicDeanEvaluation: academicDeanEval,
            studentTotalAvgScore,
            deptTotalAvgScore,
            combinedTotalAvgScore,
            studentAvgCriteriaScores,
            deptAvgCriteriaScores,
            academicDeanScore,
            academicDeanRemark
          };
        })
      );
  
      setTeachers(teachersWithDeptEvals);
      setOverallAverage(calculateOverallAverage(teachersWithDeptEvals));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setTeachers([]);
      setOverallAverage(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EvaluationContext.Provider value={{ 
      teachers, 
      overallAverage, 
      error, 
      isLoading, 
      fetchTeachers 
    }}>
      {children}
    </EvaluationContext.Provider>
  );
}

export function useEvaluation() {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error('useEvaluation must be used within an EvaluationProvider');
  }
  return context;
}