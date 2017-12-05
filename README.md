# ScrollPoint
ScrollPoint, a tool used to animate elements when scrolling. Available for jQuery.

## Options
```
offset: integer
	Offset defines an offset for triggering the animation
	50 would set the offset to wait 50 more pixels before triggering the animation
	-50 would set the offset to trigger the animation 50 pixels sooner

triggeredClass: string
	A class or classes added to the element as soon as it is triggered

animation: string
	Defines the animation used, pulled from the CSS classes. All animations are done via CSS.

delay: integer
	Defines a delay in miliseconds to delay the triggering of the animation

loadAfter: $(element)
	Defines an element that is required to load before this element

beforeTrigger: function()
	Function that runs before triggering the animation

onTrigger: function()
	Function that runs when the animation is triggered

```

## Usage
```
$('.scrollitem').scrollpoint({
    animation: 'rightFade',
    offset: 0,
    triggeredClass: '',
    delay:0
});
```

### Predefined Animations
```
fadeUp
fadeLeft
fadeRight
slideRight
slideLeft
quickSlideRight
zoomIn
```