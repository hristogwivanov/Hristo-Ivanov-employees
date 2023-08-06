const services = {};

services.findLongestPartners = (lines) => {
    let partnerships = [];
    let recordsArray = [];

    for (const line of lines) {
        recordsArray.push(line.split(', '))
    }

    recordsArray.shift()


    for (let record = 0; record < recordsArray.length; record++) {
        for (let comparedRecord = record + 1; comparedRecord < recordsArray.length; comparedRecord++) {
            assessRecords(recordsArray[record], recordsArray[comparedRecord], partnerships)
        }
    }

    partnerships.sort((a, b) => b.days - a.days);
    let result = {
        firstEmployeeId: partnerships[0].firstEmpID,
        secondEmployeeId: partnerships[0].secondEmpID,
        projects: partnerships[0].projects,
        days: partnerships[0].days,
     }

    return result
}

const assessRecords = (firstRecord, secondRecord, partnerships) => {
    if (firstRecord[0] === secondRecord[0]) { return }; //check for different empID
    if (firstRecord[1] !== secondRecord[1]) { return }; //check for same project
    const firstRecordWorkDates = {
        dateFrom: new Date(firstRecord[2]).getTime(),
        dateTo: new Date(firstRecord[3]).getTime(),
    }
    const secondRecordWorkDates = {
        dateFrom: new Date(secondRecord[2]).getTime(),
        dateTo: new Date(secondRecord[3]).getTime(),
    }

    if (firstRecordWorkDates.dateFrom >= secondRecordWorkDates.dateTo) { return }
    if (secondRecordWorkDates.dateFrom >= firstRecordWorkDates.dateTo) { return }
    //PartnershipID is created by the lower EmpID number + & + the higher EmpID number
    let partnershipID = '';
    let lowerID = '';
    let higherID = '';
    if (firstRecord[0] < secondRecord[0]) {
        partnershipID = firstRecord[0] + '&' + secondRecord[0];
        lowerID = firstRecord[0];
        higherID = secondRecord[0];
    }
    else {
        lowerID = secondRecord[0];
        higherID = firstRecord[0];
    }
    partnershipID = lowerID + '&' + higherID;

    if (!partnerships.find(part => part.id === partnershipID)) {
        const newPartnership = { id: partnershipID, firstEmpID: lowerID, secondEmpID: higherID, projects: [], days: 0 };
        partnerships.push(newPartnership)
    }
    const projectId = firstRecord[1];

    const partnership = partnerships.find(part => part.id === partnershipID)
    if (partnership) {
        partnership.projects.push(projectId)
        const daysToAdd = calculateDays(firstRecord[2], firstRecord[3], secondRecord[2], secondRecord[3])
        partnership.days += daysToAdd
    }
}

const calculateDays = (firstStart, firstEnd, secondStart, secondEnd) => {
    let start = 0;
    let end = 0;
    if (firstEnd === 'NULL') { firstEnd = dateIsNULL(firstEnd) }
    if (secondEnd === 'NULL') { secondEnd = dateIsNULL(secondEnd) }
    if (firstStart > secondStart) { start = firstStart }
    else { start = secondStart };
    if (firstEnd < secondEnd) { end = firstEnd }
    else { end = secondEnd };
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    return Math.abs(parseInt((endDate - startDate) / (24 * 3600 * 1000)));
}

const dateIsNULL = (dateTo) => {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear());
    today = year + '-' + month + '-' + day;
    return today;
};

export default services;