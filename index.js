let moment = require('moment');

//
//  This step function is responsabile for tracking the time elapsed since
//  the first execution
//
exports.handler = async (event) => {
    
    //
    //  1.  Get the data when we started executing the Step Function
    //
    let execution_date = event.execution_date;
    
    //
    //  2.  Get the actual date
    //
	let now = moment();
	
	//
	//  3.  Convert the execution date in to a Moment object
	//
    let past = moment(execution_date);
    
    //
    //  4.  Add to the execution time almost a year 
    //
    let future = past.add(360, 'days');
    
    //  
    //  5.  Check to see if the future date based on the executin time 
    //      is still ahead of Now. If Now becomes bigger, then we know one year
    ///     passed.
    //
    let result = moment(future).isBefore(now);

    //
    //  6.  By default we asume that we did not reach the year limit of
    //      a Step Functions
    //
    event.year_limit = false;
    
	//
	//  7.  Check if we are exciding our time limit of a year
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