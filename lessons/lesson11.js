/*
- npx playwright test
Команда, пов'язана з Playwright, яка використовується для виконання автоматизованих
тестів веб-додатків. Playwright - це бібліотека для автоматизації браузерів, яка дозволяє створювати та запускати тести в браузерах Chrome, Firefox, і WebKit.

- npx playwright test --project=chromium -- headed
Команда запускає тільки в chromium'і тести виводячи їх на екран

- npx playwright test loginTests.spec.js --project=chromium -- headed - запускає тільки специфічний тестовий файл

- npx playwright test -g "LogIn test" --project=chromium -- headed - запускає тільки специфічинй тест, в нашому випадку "LogIn test". -g якраз і вказує на певний тест

- npx playwright show-report - показує репорт

*/
