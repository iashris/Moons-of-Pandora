PlanetGenerator planetGen;
PFont avenir;float radx;int choose;int tiiim;
int radm=(int)random(200,450);color from,to;
String[] consonants={"k","kh","p","st","g","gh","ch","ge","p","x","q","kr","mr","qu","gr","br","j","kl","dr","hr","fr","sm","pt","ksh","f","b","v","m","th","n","ll","r","l","s","sh","pl","sht","rh","ph","ps"};
String[] vowels={"a","a","a","a","e","e","i","i","i","i","o","u","oo","y","y","ei","eu","au","oa","ou","ui","iu","ia"};
String[] ends={"us","ys","an","ea","ion","eus","ora","ira","as","ypso","apo","aqa","eip","axa","ene","eces","icia","eon","eron","ania","anda","ica","ina","ia","istan","ada","ico","ino","iba"};
int[] frequency={0,0,0,1,1,1,1,2,2};
public class Body {
  PVector pos;
  PImage img;
  PGraphics g;
  int d;
  int timer=0;
  boolean r;
  Body() {
    pos = new PVector(0, 0);
    planetGen.radius(radm);
    img = planetGen.create();
    d = 0;
    r = false;
  }
}
ArrayList <Body> bodies;

String namegenerator(){
  String result="";
  int times=frequency[(int)random(7)];
  for(int o=0;o<times;o++){
    result+=consonants[(int)random(consonants.length)];
    result+=vowels[(int)random(vowels.length)];
  }
  result+=consonants[(int)random(consonants.length)];
  result+=ends[(int)random(ends.length)];
  return result.substring(0, 1).toUpperCase() + result.substring(1);
}

int[] calctocolor(int a,int b, int c){
  if ((a+b+c)/3>128){
    //lightcolor
    int[] arrr={(int)constrain(c/4,0,255),(int)constrain(a/4,0,255),(int)constrain(b/4,0,255)};
    return arrr;
  }
  else{
    //darkcolor
    int[] arrr={(int)constrain(c*3.5,0,255),(int)constrain(a*3.5,0,255),(int)constrain(b*3,0,255)};
    return arrr;
  }
}

void setup() {
  smooth();
  background(0);
  
  int fromr=(int)random(255);int fromg=(int)random(255);int fromb=(int)random(255);
  from = color(fromr,fromg,fromb);
  
  int[] toarray=calctocolor(fromr,fromg,fromb);
  to=color(toarray[0],toarray[1],toarray[2]);


  size(768, 512);
  avenir= loadFont("data/Avenir-Heavy-28.vlw");
  tiiim=0;
  choose=(int)random(14);
  
  planetGen = new PlanetGenerator();
  bodies = new ArrayList < Body > ();
    Body b = new Body();
    bodies.add(b);
    
    int numStars=(int)random(100,600);
    for(int k=0;k<numStars;k++){
    addStar();
  }
  fill(255);
  textFont(avenir);
  textSize(28);
  String naamiska=namegenerator();
  text(naamiska,470,443);
  textSize(10);
  fill(200,163,100);
  text("L U N A B O T ~ i A S H R I S ",470,464);
  
}
void draw() {
  tiiim++;
  image(bodies.get(0).img,constrain(680-radm*0.9-radm/2,20,384-radm/2),256-radm/2);
  if(tiiim==5){saveFrame("output.png");exit();}
}
void addStar(){
  if(random(1)>0.1){
    fill((int)random(255));
  }
  else{
    fill((int)random(255),(int)random(255),(int)random(255),(int)random(255));
  }
  if(random(1)<0.1){radx=random(6);}else{radx=random(3);}
  ellipse(random(width),random(height),radx,radx);
}
class PlanetGenerator {
  private int s;
  private float xNoiseOffset;
  private float yNoiseOffset;
  private int noiseSeedVal;
  public PlanetGenerator() {
    xNoiseOffset = 0;
    yNoiseOffset = 0;
    noiseSeedVal = 0;
  }
  public void radius(int s) {
    this.s = s;
  }
  void softenEdge(PImage img) {
    float max = 1;
    float min = 0.95;
    for (int y = 0; y < s; y++) {
      for (int x = 0; x < s; x++) {
        float d = dist(s/2.0, s/2.0, x + 0.5, y + 0.5);     
        if ((d/s) * 2 >= min && (d/s) * 2 <= max){
          float darken = map((d/s) * 2, min, max, 1, 0);
          color col = img.pixels[y * s + x];
          float r = red(col) * darken;
          float g = green(col) * darken;
          float b = blue(col) * darken;
          img.pixels[y * s + x] = color(r, g, b);
          img.updatePixels();
        }
      }
    }
  }
  PImage create() {
    PImage img = new PImage(s, s, ARGB);
    img.loadPixels();
    xNoiseOffset = random(2, 10);
    yNoiseOffset = random(2, 10);
    noiseSeedVal = (int)random(0, 1000);
    noiseDetail((int)random(60,100), random(0.6,0.8));
    noiseSeed(noiseSeedVal);
    for (int x = 0; x < s; x++) {
      for (int y = 0; y < s; y++) {
        float xNoise = xNoiseOffset + (x * 0.01);
        float yNoise = yNoiseOffset + (y * 0.01);
        float n = noise(xNoise, yNoise);
        //int v = (int)map(n, 0.0, 1.0, 0.0, 25);
        float v = map(n, 0.0, 1.0, 0.0, 0.95);
        if (dist(s/2.0, s/2.0, x + 0.5, y + 0.5) <= s/2.0) {
          //img.pixels[(y * s) + x] = xxx[choose][constrain(v,0,33)];
          img.pixels[(y * s) + x] =lerpColor(from, to, v);
        }
      }
    }
    softenEdge(img);
    img.updatePixels();
    return img;
  }
}