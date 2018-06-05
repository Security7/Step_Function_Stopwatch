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
    //  3.  We get the actual time and subtract almost a year from it. This way
    //      we can use this time against the Execution Time.
    //
	let a_year_from_now = moment().add(360, 'days');
	
	//
	//  4.  Compare the Execution Time with the time in the future
	//
	let result = moment(a_year_from_now).isBefore(execution_date);
	
	//
	//  5.  Check if we are exciding our time limit of a year
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