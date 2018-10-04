# graphs
Graphs Using Wes Mantooth

http://wesmantooth.jeremyheminger.com

https://github.com/061375/Wes.Mantooth

Working on a simpler user interface for a Rasberry Pi that needs to be rather lite.
Needed some graphs that could update using live data.
Something like Google Charts was overkill and I need the source to be local so it can work sans internet.

As of this update, this took me about 5 hours or so...

### Horizontal Bar Graph
```
/** 
 * @param {Object} a DOM node
 * @param {String} the title of the module
 * @param {Array} list of object with parameters
 **/
 horizBarGraph($t,title,data)
```

### Vertical Bar Graph
```
/** 
 * @param {Object} a DOM node
 * @param {String} the title of the module
 * @param {Array} list of object with parameters
 **/
 verticalBarGraph($t,title,data)
```

### Positive Live Data Streem
```
/** 
 * live data (only positive numbers) - actually it handles negative numbers but, not ideally
 * @param {Object} a DOM node
 * @param {String} the title of the module
 * @param {Array} list of object with parameters
 **/
 posLiveDataStream($t,title,data)
```

### Live Data Streem
```
/** 
 * live data 
 * @param {Object} a DOM node
 * @param {String} the title of the module
 * @param {Array} list of object with parameters
 **/
 livDataStream($t,title,data)
```
