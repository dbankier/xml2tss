# xml2tss

Build an empty tss file from an Alloy view xml file

# Install

```
sudo npm install -g xml2tss
```

# CLI Usage

```
xml2tss [filename]
``` 

converted filed is returned to stdout (so you can build your own editor
plugin)

## to output to a file

```
xml2tss row.xml > ../styles/row.tss
```

## to clipboard (OS X)

```
xml2tss row.xml | pbcopy
```
# Library Usage

The `convertString` and `convertFile` functions are available:

e.g.

```
var xml2tss = require("xml2tss");

xml2tss.convertString('<Alloy><Win id="win"/></Alloy>',function(err,data) {
  console.log(data);
});

xml2tss.convertFile('row.xml',function(err,data) {
  console.log(data);
});
```

# Output

From this:

```
<Alloy>
  <Window id="addWin" title="Add Item" class="container" modal="true">
    <TextField id="itemField" hintText="What do you need to do?" />
    <Button id="addBtn" class="button again">Add Item</Button>
    <Button id="cancelBtn" class="button" class="two">Cancel</Button>
  </Window>
</Alloy>
```

Generates this:

```
"#addBtn" : {

}
"#addWin" : {

}
"#cancelBtn" : {

}
"#itemField" : {

}
".again" : {

}
".button" : {

}
".container" : {

}
```
