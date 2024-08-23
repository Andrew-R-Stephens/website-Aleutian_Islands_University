<div style="display:float" align="center">
    <img height="200px" src="https://github.com/Andrew-R-Stephens/website-Aleutian_Islands_University/blob/main/src/res/unilogo-simple.png"/>
</div>

<br>

<div align='center'><h1 style="color: ghostwhite">Aleutian Islands University Website</h1></div>

<p>A completely functional university website which allows both student registration and administrative maintenance.</p>
<p>
    <code>Content</code>&emsp;&ensp;Capstone Project<br/>
    <code>Where</code>&emsp;&emsp;&ensp;SUNY College at Old Westbury<br/>
    <code>Course</code>&emsp;&emsp;Systems Design and Engineering<br/>
    <code>Professor</code>&ensp;<a href="https://www.linkedin.com/in/naresh-gupta-8b62601a/">Naresh Gupta</a>
</p>

<br>
    
<div style="display:float" align="center">
    <img src="https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=black&style=bold"/>
    <img src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=bold"/>
    <img src="https://img.shields.io/badge/-Typescript-3178C6?logo=typescript&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/-PHP-777BB4?logo=php&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=black&style=bold"/>
    <img src="https://img.shields.io/badge/Apache-D22128?logo=apache&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/AWS-232F3E?logo=amazon%20aws&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Git-Bash-F05032?logo=git&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Github-181717?logo=github&logoColor=white&style=bold"/>
</div>

<br>

<div align='left'><h2>Index</h2><div>
<div><a href="#problem-statement">Problem Statement</a></div>
<div><a href="#live-demo">Live Demo</a></div>
<div><label>&emsp;<a href="#demo-logins">Demo Logins</a></label></div>
<div><label>&emsp;<a href="#sample-screenshots">Sample Screenshots</a></label></div>
<div><a href="#design-and-architecture">Design and Architecture</a></div>
<div><label>&emsp;<a href="#technologies">Technologies</a></label></div>
<div><label>&emsp;<a href="#documentation">Documentation</a></label></div>
<div><label>&emsp;<a href="#architecture">Architecture</a></label></div>
<div><label>&emsp;&emsp;<a href="#high-level-architecture">High-Level Architecture</a></label></div>
<div><label>&emsp;&emsp;<a href="#low-level-architecture">Low-Level Architecture</a></label></div>
<div><a href="#contributors">Contributors</a></div>

<hr/>

<div align='left'><h3>Problem Statement</h3></div>

<p>We are instructed to develop a <b>completely functional</b> university website which allows both <b>student registration and administrative maintenance</b>. Our final deliverable follows the assignment's directive which has been curated by the professor.</p>
<p>We have expressed our accumulated abilities acquired over each contributors' time in university. We have expressed our ability to learn high level technologies outside of the classroom. This was done through our use of <b>React.js</b>, implementing <b>ES6 Javascript</b> technologies through <b>Typescript</b>, API calls through <b>PHP</b>, <b>CORS</b> handling, <b>Stored Procedures</b> and other <b>MySQL</b> technologies, configuring HTTPS through <b>Apache</b>, configuring the <b>LAMP</b> stack and other such Devops, and using more involved <b>Amazon Cloud Services</b> such as <b>EC2</b>, <b>Elastic IP</b>, <b>Route 53</b>, and <b>SES</b>.</p>
<p>Our Database was meticulously designed to house most information relevant to a university from the eyes of <b>thousands of users -- students, faculty, administrators, and researchers</b>. Thus, we modeled our data using the Course Catalogs of SUNY Old Westbury and SUNY Farmingdale to generate a very <b>realistic model</b>. Our system is able to handle the complexities of this <b>real-world data</b>. Courses have course <b>prerequisites</b> (which also have prerequisites), leading to course registration dependencies. <b>Majors and Minor programs</b> have course requirements, subsections of <b>credits and minimum grade and credit requirements</b>, which controlled the ability to generate <b>Degree Audits and Unofficial Transcripts</b>. The system supports <b>Full or Part Time Undergraduate, Graduate, and PhD</b> levels; and any student would be allowed to enroll as <b>single major, single minor, double majors, or major/minor</b>. The system suppotrs <b>Full Time or Part Time Faculty</b> with specializations in subjects. The system suppotrs <b>Primary and Secondary Administration</b>, where the former is allowed to modify any user's personal/account information, registration, or enrollments. All aforementioned functionality is only scraping the surface of what the full system does.</p>

<br>

<div align='left'><h3>Live Demo</h3></div>

<b>Visit:</b> [Aleutian Islands University Website](https://aiu.tritium-studios.com/)

<br>

<h3>Demo Logins</h3>
<blockquote>You may use these to test the system. Please respect the represented data. Changes are permanent.</blockquote>
<table>
    <head><tr><th>User Type</th><th>Email</th><th>Password</th></tr></head>
    <body><tr><td>Student</td><td>slowdh@aiuniversity.edu</td><td>inhachabit</td></tr></body>
    <body><tr><td>Faculty</td><td>fsweet@aiuniversity.edu</td><td>suscipitaf</td></tr></body>
    <body><tr><td>Administrator</td><td>asteph.aiu@aol.com</td><td>hooplah</td></tr></body>
</table>

<br>

<h3>Sample Screenshots</h3>
<details closed>
<summary>Guest User</summary>
<h5>Home Page</h5>
<div><img title="Home Page" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_1.png"/></div>
<br>
<h5>Course Catalog</h5>
<div><img title="Course Catalog" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_2.png"/></div>
<br>
<h5>Catalog Department Information</h5>
<div><img title="Catalog Department Information" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_3.png"/></div>
<br>
<h5>Catalog Program Information</h5>
<div><img title="Catalog Program Information" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_4.png"/></div>
<br>
<h5>Login Page</h5>
<div><img title="Login Page" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_5.png"/></div>
</details>

<details closed>
<summary>Student User</summary>
<h5>Student Account Information Page</h5>
<div><img title="Student Account Information Page" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_6.png"/></div>
<br>
<h5>Semester Master Schedule Fall 2022</h5>
<div><img title="Semester Master Schedule Fall 2022" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_7.png"/></div>
<br>
<h5>Semester Master Schedule Fall 2022, filtered</h5>
<div><img title="Semester Master Schedule Fall 2022, filtered" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_8.png"/></div>
<br>
<h5>Student Advisor Information</h5>
<div><img title="Student Advisor Information" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_9.png"/></div>
<br>
<h5>Student Transcript</h5>
<div><img title="Student Transcript" height="240" src="https://raw.githubusercontent.com/Andrew-R-Stephens/Andrew-R-Stephens/master/assets/AIU%20Diagrams/aiu_10.png"/></div>
</details>

<br>

<div align='left'><h3>Contributors</h3></div>

#### Team Leader<br/>&ensp;[Andrew Stephens](https://github.com/Andrew-R-Stephens)
#### Fullstack / Database<br/>&ensp;[Andrew Stephens](https://github.com/Andrew-R-Stephens)
#### Back-end / Database <br/>&ensp;[Brian Mejia](https://github.com/brintend0), [Gwen Alessi](https://github.com/Alessi98)

<br>

<div align='left'><h3>Design and Architecture</h3></div>

<br>

<div align='left'><h4>Documentation</h4></div>

<div><a href="https://github.com/asteph11/SystemDesignProject/blob/main/documentation/Systems%20Design%20SRS.pdf">SRS</a></div>
<div><a href="https://github.com/asteph11/SystemDesignProject/blob/main/documentation/AIU%20Design%20Document.pdf">Design Document</a></div>
<div><a href="https://github.com/asteph11/SystemDesignProject/blob/main/documentation/AIU%20User%20Manual.pdf">User Manual</a></div>

<br>

<div align='left'><h4>Architecture</h4></div>

<br>

<div align='left'><h5>High-Level Architecture</h4></div>
<blockquote>TODO</blockquote>
<!-- TODO -->

<br>

<div align='left'><h5>Low-level Architecture</h4></div>
<blockquote>TODO</blockquote>
<!-- TODO -->

<br>

<div align='left'><h3>Technologies</h3></div>

<div align='left'><h4>Front-End</h4></div>
<div style="display:float">
    <img src="https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=black&style=bold"/>
    <img src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=bold"/>
    <img src="https://img.shields.io/badge/-Typescript-3178C6?logo=typescript&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=bold"/>
</div>

<h4>Back-End / Database</h4>
<div style="display:float">
    <img src="https://img.shields.io/badge/-PHP-777BB4?logo=php&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white&style=bold"/>
</div>

<h4>NPM Packages</h4>
<div style="display:float">
    <img src="https://img.shields.io/badge/MUI-Pagination-007FFF?logo=mui&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/ChartsJS-FF6384?logo=chart.js&logoColor=white&style=bold"/>
</div>

<h4>Server</h4>
<div style="display:float">
    <img src="https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=black&style=bold"/>
    <img src="https://img.shields.io/badge/Apache-D22128?logo=apache&logoColor=white&style=bold"/>
</div>

<h4>Hosting</h4>
<div style="display:float">
    <img src="https://img.shields.io/badge/AWS-232F3E?logo=amazon%20aws&logoColor=white&style=bold"/>
</div>
<div style="display:float">
    <img src="https://img.shields.io/badge/AWS-SES-232F3E?logo=amazon%20aws&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/AWS-Route%2053-232F3E?logo=amazon%20aws&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/AWS-IAM-232F3E?logo=amazon%20aws&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/AWS-Certificate%20Manager-232F3E?logo=amazon%20aws&logoColor=white&style=bold"/>
</div>
<div style="display:float">
    <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?logo=amazon%20ec2&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Amazon%20EC2-Elastic%20IP-FF9900?logo=amazon%20ec2&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Amazon%20EC2-Load%20Balancer-FF9900?logo=amazon%20ec2&logoColor=white&style=bold"/>
</div>

<h4>IDE's / Platforms</h4>
<div style="display:float">
    <img src="https://img.shields.io/badge/-IntelliJ%20Ultimate-000000?logo=intellij%20idea&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/MySQL%20Workbench-4479A1?logo=mysql&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Fillezilla-BF0000?logo=filezilla&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Git-Bash-F05032?logo=git&logoColor=white&style=bold"/>
    <img src="https://img.shields.io/badge/Github-181717?logo=github&logoColor=white&style=bold"/>
</div>

<br>

<h3 style="color: ghostwhite">Usage and License Limitations</h3>
<p style="color: indianred"><code>LICENSE WARNING:</code> Please read and understand the included <a href="https://github.com/asteph11/SoftwareEngineeringProject/blob/main/LICENSE.md">GPL License</a> before attempting to use this code.</p>
<p>This strict copyleft license is in place due to the wholesale cheating that goes on at SUNY College at Old Westbury. Please understand the License before you get yourself into trouble.</p>
<p><b>Do NOT</b> use any of this project's content <em>(structure /or source code /or libraries /or assets /or etc.)</em>, regardless of external modification, without citing Copyright where such content is used.</p>
<p><b>DO</b> contact <a href="mailto:asteph11@oldwestbury.edu">Andrew Stephens</a> for inquiries.</p>
