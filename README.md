# Tut-9-Group-F-pzho0019

1. Instructions on how to interact with the work：Move the mouse to the button at the bottom of the screen, click the play button, and wait for the music to start. The chosen artwork will begin loading immediately in sync with the rhythm and volume of the music.
2. Details of individual approach to animating the group code:
    - Which did you choose to drive your individual code: Audio
    - Which properties of the image will be animated and how; highlighting how it is unique from other group members: The chosen artwork’s color is based on the value obtained from the volume of the music through an amplitude analyzer, and it will be loaded in sync with the rhythm and volume of the music.
    - References to inspiration: ![An iamge of an visualize music](https://arganesh3.wordpress.com/wp-content/uploads/2015/07/rhythm.gif) this gif shows that the color of image is animated and it is sync with the volume of the music.
    - Short technical explanation: my individual code works is using "lerpColor" to create a dynamic Color base on the volume. The syntax of "lerpColor" is "lerpColor(c1, c2, amt)". In the individual code works, the value of c1 and c2 is obtained from the image color, and the value of amt is obtained from the value of the music volume. The highest value of volume is 1, and the lowest is 0.