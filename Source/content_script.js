walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
			break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;

  // Deal with the easy case
  v = v.replace(/\b(R|r)oller (D|d)erby/g, function(match, p1, p2, offset, string) {
    // r - 5 = m
    // d - 2 = b
    m = String.fromCharCode(p1.charCodeAt(0) - 5);
    b = String.fromCharCode(p2.charCodeAt(0) - 2);
    return m + "y " + b + "utt";
  });

  // // Deal with private derby
  // v = v.replace(/\b(P|p)rivate (C|c)erby/g, function(match, p1, p2, offset, string) {
  //   // c - 1 = b
  //   b = String.fromCharCode(p2.charCodeAt(0) - 1);
  //   return b + "utt";
  // });
  // Get the corner cases
  if(v.match(/derby/i)) {
    // If we're not talking about weather
    //if(v.match(/PaaS|SaaS|IaaS|computing|data|storage|cluster|distributed|server|hosting|provider|grid|enterprise|provision|apps|hardware|software|/i)) {
      v = v.replace(/(D|d)erby/gi, function(match, p1, offset, string) {
        // c - 1 = b
        b = String.fromCharCode(p1.charCodeAt(0) - 2);
        return b + "utt";
      });
    //}
  }
	textNode.nodeValue = v;
}


