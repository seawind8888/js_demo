const { dockStart } = require('@nlpjs/basic');

(async () => {
    const dock = await dockStart({ use: ['Basic'] });
    const nlp = dock.get('nlp');
    nlp.addLanguage('cn');
    // Adds the utterances and intents for the NLP
    nlp.addDocument('cn', '再见', 'greetings.bye');
    nlp.addDocument('cn', '拜拜', 'greetings.bye');
    nlp.addDocument('cn', '之后再进啊', 'greetings.bye');
    nlp.addDocument('cn', '这会走了', 'greetings.bye');
    nlp.addDocument('cn', '我必须走了', 'greetings.bye');
    nlp.addDocument('cn', '哈喽', 'greetings.hello');
    nlp.addDocument('cn', '你好', 'greetings.hello');
    // nlp.addDocument('cn', 'howdy', 'greetings.hello');

    // Train also the NLG
    nlp.addAnswer('cn', 'greetings.bye', 'Till next time');
    nlp.addAnswer('cn', 'greetings.bye', '明天见!');
    nlp.addAnswer('cn', 'greetings.hello', 'Hey there!');
    nlp.addAnswer('cn', 'greetings.hello', 'Greetings!');
    await nlp.train();
    const response = await nlp.process('cn', 'I should go now');
    console.log(response);
})();