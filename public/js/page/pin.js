
class PinPage{

    static build(content){
        console.log('PinPage.build called with content:', content);
        let answerTree = new AnswerTree();

        const qPanel = new QPanel(CLASSNAMES.MAIN_CONTAINER);
        console.log('QPanel created, calling initiate...');
        qPanel.initiate();
        console.log('QPanel initiated, calling load...');

        // Create KartaPair for step 0 (map with geolocation)
        const kartaPair = new KartaPair();
        const karmaSet = new QASet(0, [kartaPair]);

        // Add KartaSet as step 0, then add question sets
        const allSets = [karmaSet, ...content.map(qs=>{
            let a = new QASet(qs.step, qs.content);
            a.convertContent();
            return a;
        })];

        qPanel.load(allSets, answerTree);
        console.log('QPanel loaded with', allSets.length, 'steps (including map)');
    };

}

