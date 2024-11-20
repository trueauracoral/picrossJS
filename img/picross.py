#!/usr/bin/env python
from PIL import Image

# Open image
imagename = "baby hippo.png"
image = Image.open(imagename)
# COLOR OF OUTLINE IN THE IMAGE
outlineColor = (0,0,0)

pixel_data = image.load()

width, height = image.size
print(width)
columns = int((width-10)/ 5)
rows  = int((height-10) / 5)

# Checks each cell if there is a black pixel
def cellCheck(sX, sY):
    count = 0
    for y in range(6):
        for x in range(6):
            if (sX + x <= 59) and (sY +y <=59):
                pixel = image.getpixel((sX + x, sY + y))
                #print((sX + x, sY + y))
                pixel = pixel[:3]
                if pixel == outlineColor:
                    count = count + 1
                    return True
    return False

# Loop through cells using the check cell
marker = [0,0]
cellGrid = []
for row in range(rows):
    xRow = []
    for column in range(columns):
        cellStatus = cellCheck(column * 6, row * 6)
        print(cellStatus)
        xRow.append(cellStatus)
    cellGrid.append(xRow)

# truth table
print()
widthMarker = []
heightMarker = []
xCount = 0
yCount = 0
for row in cellGrid:
    for item in row:
        print(item, end="\t")
    print()
print()
print(str(cellGrid).lower()[1:][:-1])

# Generate vertical and horizontal numbers
horizontal_markers = []
for row in cellGrid:
    widthMarker = []
    xCount = 0
    for item in row:
        if item:
            xCount += 1
        else:
            if xCount > 0:
                widthMarker.append(xCount)
                xCount = 0
    if xCount > 0:
        widthMarker.append(xCount)
    if not widthMarker:
        widthMarker = [0]
    horizontal_markers.append(widthMarker)

print(horizontal_markers)
#for marker in horizontal_markers:
#    print(marker)
print()

vertical_markers = []
for col in range(columns):
    heightMarker = []
    yCount = 0
    for row in range(rows):
        if cellGrid[row][col]:
            yCount += 1
        else:
            if yCount > 0:
                heightMarker.append(yCount)
                yCount = 0
    if yCount > 0:
        heightMarker.append(yCount)
    if not heightMarker:
        heightMarker = [0]
    vertical_markers.append(heightMarker)

print(vertical_markers)
#for marker in vertical_markers:
#    print(marker)

count = 0
for y in range(height):
    for x in range(width):
        pixel = image.getpixel((x, y))
        pixel = pixel[:3]
        if pixel == outlineColor:
            count = count + 1
        else:
            pixel_data[x, y] = (114, 185, 232)

image.save(imagename.replace(".png", "") + "-white.png", format="png")