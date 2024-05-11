# How to Run
1. Navigate to root directory
2. Run `npm install`
3. Run `npm start`
4. View within browser on `localhost:3000`

# General Notes
- The code for the selection component is within the src/select folder
- I decided to split the single and multi select options into seperate 
components.
- There is an message in the console because I am using onClick instead of 
onChange. The reason I'm using onClick is because onChange won't fire when the
input is the same, which is how you deselect an existing option in my single
select form. Online mentions that onInput should work, but it isn't triggering
at all. If I had 20 more minutes I'm sure I could figure this out.



# Future Improvements
- Refactor code to use useMemo and useCallback, I was a bit rusty with react and forgot about these functions intially
and then ran out of time
- Add more configuration options, such as:
  - Set sizing
  - allow for searching
  - **allow for the field to be disabled**
- Add option to specify id of html form that would automatically submit values
from select field when the form is submitted
- Use a map instead of array to check if the value already exists. Would have to research if this is possible/more 
effecient using setState

