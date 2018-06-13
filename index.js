let moment = require('moment');

//
//  This step function is responsabile for tracking the time elapsed since
//  the first execution
//
exports.handler = async (event) => {
    
    //
    //  1.  First we check if the execution data is present. If not this means 
    //      that the SF Loop just started and we should set the data when
    //      the execution ocoured.
    //
    if(!event.execution_date)
    {
        event.execution_date = moment().format("YYYY-MM-DD");
    }
    
    //
    //  2.  Get the data when we started executing the Step Function
    //
    let execution_date = event.execution_date;
    
    //
    //  3.  Get the actual date
    //
	let now = moment();
	
	//
	//  4.  Convert the execution date in to a Moment object
	//
    let past = moment(execution_date);
    
    //
    //  5.  Add to the execution time almost a year 
    //
    let future = past.add(360, 'days');
    
    //  
    //  6.  Check to see if the future date based on the executin time 
    //      is still ahead of Now. If Now becomes bigger, then we know one year
    ///     passed.
    //
    let result = moment(future).isBefore(now);

    //
    //  7.  By default we asume that we did not reach the year limit of
    //      a Step Functions
    //
    event.year_limit = false;
    
	//
	//  8.  Check if we are exciding our time limit of a year
	//
	if(result)
	{
	    //
	    //  1.  Mark the step function to be restarted.
	    //
	    event.year_limit = true;
	}
    
    //
    //  ->  Return the whole event so we preserve the data that was passed to
    //      use.
    //
    return event;
};