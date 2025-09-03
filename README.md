# 🎓 Interactive Presentation: Describing People

An engaging, interactive presentation application designed specifically for 5th
grade elementary students to learn how to describe people in English. This
application combines educational content with interactive quizzes, making
learning fun and effective.

**Perfect for teaching practice sessions and classroom demonstrations!**

## ✨ Features

- **Interactive Slides**: 13 engaging slides covering vocabulary, grammar, and
  practice exercises
- **Quiz System**: Multiple choice questions and matching pair games with
  immediate feedback
- **Progress Tracking**: Visual progress bar and scoring system
- **Audio Support**: Text-to-speech for pronunciation practice
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support
- **Sound Effects**: Engaging audio feedback for correct/incorrect answers
- **Modern UI**: Beautiful, child-friendly design with animations
- **No Backend Required**: Works entirely offline, perfect for classroom use

## 🚀 Quick Start

### Option 1: Direct Access

Simply open `index.html` in your web browser to start using the application
immediately.

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/ahmadsaoghi-gamedev/presentasi.git

# Navigate to the project directory
cd describing-people-presentation

# Install dependencies (optional)
npm install

# Start local development server
npm run dev
```

## 📚 Learning Content

The presentation covers:

1. **Warm-up Activity**: "Guess Who?" game
2. **Learning Objectives**: Clear goals for the lesson
3. **Vocabulary**: Physical appearance and clothing terms
4. **Grammar**: Sentence structure with "He has..." and "She has..."
5. **Text Structure**: How to write descriptive texts
6. **Practice Exercises**: Fill-in-the-blank activities
7. **Interactive Quizzes**: Multiple choice questions
8. **Final Activity**: Creative writing exercise

## 🎯 Target Audience

- **Grade Level**: 5th grade elementary students
- **Language Level**: Beginner to intermediate English learners
- **Age Range**: 10-11 years old
- **Learning Style**: Visual and interactive learners

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with animations and responsive design
- **Audio**: Web Speech API for pronunciation
- **Deployment**: Vercel, GitHub Pages compatible

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers (1280px+)
- Tablets (768px - 1279px)
- Mobile phones (320px - 767px)

## 🎨 Design Principles

- **Child-Friendly**: Large fonts, bright colors, simple navigation
- **Accessibility**: High contrast, keyboard navigation, screen reader support
- **Engagement**: Interactive elements, sound effects, animations
- **Educational**: Clear learning objectives, immediate feedback, progress
  tracking

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch and deploy

## 📊 Scoring System

The application includes:

- Real-time scoring system
- Progress tracking
- Simple score display
- No data collection or storage

## 🔧 Customization

You can easily customize:

- Content and vocabulary
- Quiz questions and answers
- Color scheme and styling
- Audio settings
- Scoring system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for
details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**Made with ❤️ for elementary education**

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Let's Describe People!</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            height: 720px;
            position: relative;
            background-image: url('https://sfile.chatglm.cn/images-ppt/68189c6ad2e5.png');
            background-size: cover;
            background-position: center;
            overflow: hidden;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.7);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40px;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 68px;
            color: #FF6B6B;
            margin-bottom: 20px;
            text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
        }
        .subtitle {
            font-size: 28px;
            color: #4D96FF;
            font-weight: 700;
            margin-bottom: 40px;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="overlay">
            <h1 class="title">Let's Describe People!</h1>
            <h2 class="subtitle">Learning How to Describe Our Friends</h2>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
======
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guess Who?</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 30px 70px;
        }
        .description {
            font-size: 24px;
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            font-weight: 700;
        }
        .pictures {
            display: flex;
            justify-content: space-around;
            margin-bottom: 40px;
        }
        .picture-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 30%;
        }
        .picture {
            width: 220px;
            height: 220px;
            object-fit: contain;
            border-radius: 20px;
            border: 5px solid #FFD166;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .picture-label {
            margin-top: 15px;
            font-size: 24px;
            font-weight: 700;
            color: #FF6B6B;
        }
        .question {
            font-size: 28px;
            color: #333;
            text-align: center;
            font-weight: 700;
            background-color: #FFD166;
            padding: 15px;
            border-radius: 15px;
            max-width: 600px;
            margin: 0 auto;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Pemanasan: Guess Who?</h1>
        </div>
        <div class="content">
            <div class="description">He has glasses.</div>
            <div class="pictures">
                <div class="picture-container">
                    <img src="https://sfile.chatglm.cn/images-ppt/439ba8203ddd.jpg" alt="Boy with glasses" class="picture">
                    <div class="picture-label">Picture 1</div>
                </div>
                <div class="picture-container">
                    <img src="https://sfile.chatglm.cn/images-ppt/fa8a16687464.jpg" alt="Girl with curly hair" class="picture">
                    <div class="picture-label">Picture 2</div>
                </div>
                <div class="picture-container">
                    <img src="https://sfile.chatglm.cn/images-ppt/b74a8db46788.jpg" alt="Boy wearing hat" class="picture">
                    <div class="picture-label">Picture 3</div>
                </div>
            </div>
            <div class="question">Who is he? Picture 1, 2, or 3?</div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
==
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Goals Today</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px 70px;
        }
        .goals-container {
            display: flex;
            flex-direction: column;
            gap: 30px;
            max-width: 800px;
            margin: 0 auto;
        }
        .goal-item {
            display: flex;
            align-items: center;
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .goal-item:hover {
            transform: translateY(-5px);
        }
        .goal-icon {
            background-color: #FFD166;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            flex-shrink: 0;
        }
        .goal-icon i {
            font-size: 30px;
        }
        .goal-text {
            font-size: 24px;
            color: #333;
            font-weight: 700;
        }
        .goal-item:nth-child(1) .goal-icon {
            background-color: #FF6B6B;
        }
        .goal-item:nth-child(2) .goal-icon {
            background-color: #06D6A0;
        }
        .goal-item:nth-child(3) .goal-icon {
            background-color: #118AB2;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Tujuan Belajar Kita Hari Ini (Our Goals Today)</h1>
        </div>
        <div class="content">
            <div class="goals-container">
                <div class="goal-item">
                    <div class="goal-icon">
                        <i class="material-icons">school</i>
                    </div>
                    <div class="goal-text">Learn new words to describe people</div>
                </div>
                <div class="goal-item">
                    <div class="goal-icon">
                        <i class="material-icons">format_quote</i>
                    </div>
                    <div class="goal-text">Learn how to make simple sentences</div>
                </div>
                <div class="goal-item">
                    <div class="goal-icon">
                        <i class="material-icons">create</i>
                    </div>
                    <div class="goal-text">Write a short text to describe a person</div>
                </div>
            </div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
==
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Words: Physical Appearance</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 30px 70px;
        }
        .categories {
            display: flex;
            flex-direction: column;
            gap: 25px;
            flex-grow: 1;
        }
        .category {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .category-title {
            font-size: 24px;
            font-weight: 700;
            color: #FF6B6B;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        .category-title i {
            margin-right: 10px;
            font-size: 28px;
        }
        .items {
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 22%;
        }
        .item-image {
            width: 120px;
            height: 120px;
            object-fit: contain;
            border-radius: 10px;
            margin-bottom: 10px;
        }
        .item-label {
            font-size: 20px;
            font-weight: 700;
            color: #333;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Kata-Kata Baru: Penampilan Fisik (New Words: Physical Appearance)</h1>
        </div>
        <div class="content">
            <div class="categories">
                <div class="category">
                    <div class="category-title">
                        <i class="material-icons">content_cut</i>
                        Hair
                    </div>
                    <div class="items">
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/9089b26aba19.jpg" alt="Hair types" class="item-image">
                            <div class="item-label">long hair</div>
                        </div>
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/9089b26aba19.jpg" alt="Hair types" class="item-image">
                            <div class="item-label">short hair</div>
                        </div>
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/9089b26aba19.jpg" alt="Hair types" class="item-image">
                            <div class="item-label">curly hair</div>
                        </div>
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/9089b26aba19.jpg" alt="Hair types" class="item-image">
                            <div class="item-label">straight hair</div>
                        </div>
                    </div>
                </div>
                
                <div class="category">
                    <div class="category-title">
                        <i class="material-icons">visibility</i>
                        Eyes
                    </div>
                    <div class="items">
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/3a37d7f31374.jpg" alt="Eye colors" class="item-image">
                            <div class="item-label">black eyes</div>
                        </div>
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/3a37d7f31374.jpg" alt="Eye colors" class="item-image">
                            <div class="item-label">brown eyes</div>
                        </div>
                    </div>
                </div>
                
                <div class="category">
                    <div class="category-title">
                        <i class="material-icons">person</i>
                        Others
                    </div>
                    <div class="items">
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/5a05669efb10.jpg" alt="Tall person" class="item-image">
                            <div class="item-label">tall</div>
                        </div>
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/5a05669efb10.jpg" alt="Short person" class="item-image">
                            <div class="item-label">short</div>
                        </div>
                        <div class="item">
                            <img src="https://sfile.chatglm.cn/images-ppt/465233d4be4d.jpg" alt="Glasses" class="item-image">
                            <div class="item-label">glasses</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
===
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Words: Clothes</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 30px 70px;
        }
        .clothes-container {
            display: flex;
            flex-direction: column;
            gap: 30px;
            flex-grow: 1;
        }
        .clothes-image {
            text-align: center;
            margin-bottom: 20px;
        }
        .clothes-image img {
            max-width: 600px;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .clothes-items {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 20px;
        }
        .clothing-item {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            width: 200px;
            height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .clothing-item:hover {
            transform: translateY(-5px);
        }
        .item-icon {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
        }
        .item-icon i {
            font-size: 60px;
        }
        .item-name {
            font-size: 22px;
            font-weight: 700;
            color: #333;
            text-align: center;
        }
        .item-translation {
            font-size: 16px;
            color: #666;
            margin-top: 5px;
        }
        .clothing-item:nth-child(1) .item-icon i {
            color: #FF6B6B;
        }
        .clothing-item:nth-child(2) .item-icon i {
            color: #FFD166;
        }
        .clothing-item:nth-child(3) .item-icon i {
            color: #06D6A0;
        }
        .clothing-item:nth-child(4) .item-icon i {
            color: #118AB2;
        }
        .clothing-item:nth-child(5) .item-icon i {
            color: #073B4C;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Kata-Kata Baru: Pakaian (New Words: Clothes)</h1>
        </div>
        <div class="content">
            <div class="clothes-container">
                <div class="clothes-image">
                    <img src="https://sfile.chatglm.cn/images-ppt/ef60d0905bcc.jpg" alt="Various clothes for children">
                </div>
                <div class="clothes-items">
                    <div class="clothing-item">
                        <div class="item-icon">
                            <i class="material-icons">checkroom</i>
                        </div>
                        <div class="item-name">T-shirt</div>
                        <div class="item-translation">Kaos</div>
                    </div>
                    <div class="clothing-item">
                        <div class="item-icon">
                            <i class="material-icons">dry_cleaning</i>
                        </div>
                        <div class="item-name">Shirt</div>
                        <div class="item-translation">Kemeja</div>
                    </div>
                    <div class="clothing-item">
                        <div class="item-icon">
                            <i class="material-icons">straighten</i>
                        </div>
                        <div class="item-name">Trousers</div>
                        <div class="item-translation">Celana panjang</div>
                    </div>
                    <div class="clothing-item">
                        <div class="item-icon">
                            <i class="material-icons">female</i>
                        </div>
                        <div class="item-name">Skirt</div>
                        <div class="item-translation">Rok</div>
                    </div>
                    <div class="clothing-item">
                        <div class="item-icon">
                            <i class="material-icons">style</i>
                        </div>
                        <div class="item-name">Dress</div>
                        <div class="item-translation">Gaun</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
===
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>How to Make Sentences</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 30px 70px;
        }
        .sentence-types {
            display: flex;
            flex-direction: column;
            gap: 30px;
            flex-grow: 1;
        }
        .sentence-type {
            background-color: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .type-title {
            font-size: 24px;
            font-weight: 700;
            color: #FF6B6B;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        .type-title i {
            margin-right: 10px;
            font-size: 28px;
        }
        .examples {
            display: flex;
            justify-content: space-around;
        }
        .example {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 45%;
        }
        .example-image {
            width: 180px;
            height: 180px;
            object-fit: contain;
            border-radius: 10px;
            margin-bottom: 15px;
            border: 4px solid #FFD166;
        }
        .example-sentence {
            font-size: 22px;
            font-weight: 700;
            color: #333;
            text-align: center;
            background-color: #FFD166;
            padding: 10px 20px;
            border-radius: 10px;
        }
        .note {
            font-size: 18px;
            color: #666;
            text-align: center;
            margin-top: 15px;
            font-style: italic;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Cara Membuat Kalimat (How to Make Sentences)</h1>
        </div>
        <div class="content">
            <div class="sentence-types">
                <div class="sentence-type">
                    <div class="type-title">
                        <i class="material-icons">face</i>
                        Using "He has..." and "She has..."
                    </div>
                    <div class="examples">
                        <div class="example">
                            <img src="https://sfile.chatglm.cn/images-ppt/cb412aeaf16e.jpg" alt="Boy with short hair" class="example-image">
                            <div class="example-sentence">He has short hair.</div>
                        </div>
                        <div class="example">
                            <img src="https://sfile.chatglm.cn/images-ppt/c3434632df67.jpg" alt="Girl with long hair" class="example-image">
                            <div class="example-sentence">She has long hair.</div>
                        </div>
                    </div>
                    <div class="note">We use "has" to talk about physical features someone possesses</div>
                </div>
                
                <div class="sentence-type">
                    <div class="type-title">
                        <i class="material-icons">accessibility_new</i>
                        Using "He is..." and "She is..."
                    </div>
                    <div class="examples">
                        <div class="example">
                            <img src="https://sfile.chatglm.cn/images-ppt/cb412aeaf16e.jpg" alt="Boy" class="example-image">
                            <div class="example-sentence">He is tall.</div>
                        </div>
                        <div class="example">
                            <img src="https://sfile.chatglm.cn/images-ppt/c3434632df67.jpg" alt="Girl" class="example-image">
                            <div class="example-sentence">She is short.</div>
                        </div>
                    </div>
                    <div class="note">We use "is" to describe someone's characteristics or qualities</div>
                </div>
            </div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
===
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Secret Recipe!</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            padding: 40px 70px;
        }
        .image-container {
            flex: 0 0 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .character-image {
            width: 300px;
            height: 300px;
            object-fit: contain;
            border-radius: 20px;
            border: 5px solid #FFD166;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .image-caption {
            font-size: 22px;
            font-weight: 700;
            color: #FF6B6B;
            text-align: center;
        }
        .recipe-container {
            flex: 0 0 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .recipe-title {
            font-size: 32px;
            font-weight: 700;
            color: #FF6B6B;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
        }
        .recipe-title i {
            margin-right: 15px;
            font-size: 36px;
        }
        .recipe-steps {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        .recipe-step {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            display: flex;
            align-items: flex-start;
        }
        .step-number {
            background-color: #FFD166;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            font-weight: 700;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .step-content {
            flex-grow: 1;
        }
        .step-title {
            font-size: 22px;
            font-weight: 700;
            color: #4D96FF;
            margin-bottom: 10px;
        }
        .step-text {
            font-size: 20px;
            color: #333;
            line-height: 1.5;
        }
        .highlight {
            color: #FF6B6B;
            font-weight: 700;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Struktur Teks Deskriptif (The Secret Recipe!)</h1>
        </div>
        <div class="content">
            <div class="image-container">
                <img src="https://sfile.chatglm.cn/images-ppt/037d632d06fe.png" alt="Boy character" class="character-image">
                <div class="image-caption">This is Budi</div>
            </div>
            <div class="recipe-container">
                <div class="recipe-title">
                    <i class="material-icons">restaurant_menu</i>
                    The Secret Recipe!
                </div>
                <div class="recipe-steps">
                    <div class="recipe-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-title">Identification (Pengenalan)</div>
                            <div class="step-text">This is <span class="highlight">Budi</span>.</div>
                        </div>
                    </div>
                    <div class="recipe-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <div class="step-title">Description (Deskripsi)</div>
                            <div class="step-text">
                                • He has <span class="highlight">short hair</span>.<br>
                                • He has <span class="highlight">black eyes</span>.<br>
                                • He is wearing a <span class="highlight">blue t-shirt</span>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
===
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Let's Practice!</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            padding: 40px 70px;
        }
        .image-container {
            flex: 0 0 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .character-image {
            width: 300px;
            height: 300px;
            object-fit: contain;
            border-radius: 20px;
            border: 5px solid #FFD166;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .image-caption {
            font-size: 24px;
            font-weight: 700;
            color: #FF6B6B;
            text-align: center;
        }
        .practice-container {
            flex: 0 0 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .practice-title {
            font-size: 32px;
            font-weight: 700;
            color: #FF6B6B;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
        }
        .practice-title i {
            margin-right: 15px;
            font-size: 36px;
        }
        .sentences {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        .sentence {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
        }
        .sentence-number {
            background-color: #FFD166;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            font-weight: 700;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .sentence-text {
            font-size: 24px;
            color: #333;
        }
        .blank {
            display: inline-block;
            width: 120px;
            height: 2px;
            background-color: #4D96FF;
            margin: 0 5px;
            position: relative;
            top: -4px;
        }
        .instruction {
            font-size: 20px;
            color: #666;
            margin-top: 30px;
            font-style: italic;
            text-align: center;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Ayo Berlatih! (Let's Practice!)</h1>
        </div>
        <div class="content">
            <div class="image-container">
                <img src="https://sfile.chatglm.cn/images-ppt/3d892bc2ece5.png" alt="Sari character" class="character-image">
                <div class="image-caption">This is Sari</div>
            </div>
            <div class="practice-container">
                <div class="practice-title">
                    <i class="material-icons">edit</i>
                    Fill in the blanks!
                </div>
                <div class="sentences">
                    <div class="sentence">
                        <div class="sentence-number">1</div>
                        <div class="sentence-text">This is<span class="blank"></span>.</div>
                    </div>
                    <div class="sentence">
                        <div class="sentence-number">2</div>
                        <div class="sentence-text">She has<span class="blank"></span>hair.</div>
                    </div>
                    <div class="sentence">
                        <div class="sentence-number">3</div>
                        <div class="sentence-text">She is wearing a pink<span class="blank"></span>.</div>
                    </div>
                </div>
                <div class="instruction">Let's complete the sentences together!</div>
            </div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
==
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Turn!</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px 70px;
        }
        .activity-container {
            background-color: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            max-width: 800px;
            width: 100%;
            text-align: center;
        }
        .activity-icon {
            font-size: 60px;
            color: #FF6B6B;
            margin-bottom: 30px;
        }
        .activity-title {
            font-size: 36px;
            font-weight: 700;
            color: #FF6B6B;
            margin-bottom: 40px;
            font-family: 'Bubblegum Sans', cursive;
        }
        .instructions {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        .instruction {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            background-color: #F8F9FA;
            border-radius: 15px;
            border-left: 5px solid #FFD166;
        }
        .instruction-icon {
            color: #4D96FF;
            font-size: 28px;
            margin-right: 20px;
        }
        .instruction-text {
            font-size: 24px;
            color: #333;
            font-weight: 700;
        }
        .encouragement {
            margin-top: 40px;
            font-size: 28px;
            font-weight: 700;
            color: #06D6A0;
            font-style: italic;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Tugasmu Sekarang (Your Turn!)</h1>
        </div>
        <div class="content">
            <div class="activity-container">
                <i class="material-icons activity-icon">assignment</i>
                <h2 class="activity-title">Let's Practice Together!</h2>
                <div class="instructions">
                    <div class="instruction">
                        <i class="material-icons instruction-icon">visibility</i>
                        <div class="instruction-text">Now, look at your friend next to you.</div>
                    </div>
                    <div class="instruction">
                        <i class="material-icons instruction-icon">create</i>
                        <div class="instruction-text">Write a short descriptive text about your friend!</div>
                    </div>
                    <div class="instruction">
                        <i class="material-icons instruction-icon">emoji_events</i>
                        <div class="instruction-text">Don't be afraid to try!</div>
                    </div>
                </div>
                <div class="encouragement">You can do it! ✨</div>
            </div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
===
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You!</title>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }
        .slide {
            width: 1280px;
            min-height: 720px;
            position: relative;
            background-color: #F8F9FA;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 30px 70px;
            background-color: #4D96FF;
        }
        .title {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 40px;
            color: white;
            text-align: center;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px 70px;
        }
        .thank-you-container {
            text-align: center;
            max-width: 900px;
        }
        .thank-you-text {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 60px;
            color: #FF6B6B;
            margin-bottom: 40px;
            text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
        }
        .image-container {
            margin: 20px 0 40px;
        }
        .children-image {
            max-width: 100%;
            height: auto;
            border-radius: 20px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            border: 5px solid #FFD166;
        }
        .message {
            font-size: 24px;
            color: #333;
            font-weight: 700;
            margin-top: 30px;
            background-color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .icon-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }
        .icon-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .icon-item i {
            font-size: 40px;
        }
        .icon-item:nth-child(1) i {
            color: #FF6B6B;
        }
        .icon-item:nth-child(2) i {
            color: #FFD166;
        }
        .icon-item:nth-child(3) i {
            color: #06D6A0;
        }
        .decoration {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 20px;
            background: linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C);
        }
    </style>
</head>
<body>
    <div class="slide">
        <div class="header">
            <h1 class="title">Terima Kasih! (Thank You!)</h1>
        </div>
        <div class="content">
            <div class="thank-you-container">
                <div class="thank-you-text">Great Job!</div>
                <div class="image-container">
                    <img src="https://sfile.chatglm.cn/images-ppt/2925dd85b23d.jpg" alt="Children waving goodbye" class="children-image">
                </div>
                <div class="message">Now you can describe people in English!</div>
                <div class="icon-container">
                    <div class="icon-item">
                        <i class="material-icons">star</i>
                    </div>
                    <div class="icon-item">
                        <i class="material-icons">favorite</i>
                    </div>
                    <div class="icon-item">
                        <i class="material-icons">thumb_up</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="decoration"></div>
    </div>
</body>
</html>
==
