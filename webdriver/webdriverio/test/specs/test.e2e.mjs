describe('Goel main window', () => {
    it('should have the root element', async () => {
        const element = await $('#root');
        expect(element).toExist();
    });
    it('should render solid.js app / have main element', async () => {
        const element = await $('main');
        expect(element).toExist();
    });
    it('should have create new goal button', async () => {
    const createGoalButton = $('#root > main > div.flex-1.px-6.overflow-y-scroll.select-none.cursor-default.z-0 > div.flex.items-center.h-full.justify-center.flex-col.gap-4 > button');
        expect(createGoalButton).toExist();
    });
});
