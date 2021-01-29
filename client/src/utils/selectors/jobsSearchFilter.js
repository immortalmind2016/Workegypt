import moment from "moment";

// Get visible jobs

export default (jobs, { text, sortBy, startDate, endDate }) => {
  return jobs
    .filter(job => {
      const createdAtMoment = moment(job.created_date);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "year")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "year")
        : true;
      const textMatch = job.title.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
