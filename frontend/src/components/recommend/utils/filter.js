import diseasesData from '../data/diseasesData.js';

function getDiseaseInfo(diseaseName) {
  if (!diseaseName) {
      return { message: "Disease name is required." };
  }
  const normalizedDiseaseName = diseaseName.toLowerCase();
  const disease = diseasesData.find(d => d.name.toLowerCase() === normalizedDiseaseName);

  if (disease) {
      return {
          prevention: disease.prevention,
          medicines: disease.medicines,
          homeRemedies: disease.homeRemedies
      };
  } else {
      return { message: "Disease not found." };
  }
}



// module.exports=getDiseaseInfo
export default getDiseaseInfo;