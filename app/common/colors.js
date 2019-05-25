const NAMED_COLORS = {
    whiteRed: 'rgba(252, 84, 87, 1)',
    white: 'rgba(255, 255, 255, 1)',
    lightGray: 'rgba(238, 238, 238, 1)',
    darkGray: 'rgba(117, 142, 152, 1)'
};

const THEME_COLORS = {
    ...NAMED_COLORS,
    main: NAMED_COLORS.whiteRed,
    background: NAMED_COLORS.white
};

const colors = {
    ...THEME_COLORS,
    colorWithAlpha(name = 'red', opacity = 1) {
        if (!THEME_COLORS[name]) {
            name = 'red';
        }
        return THEME_COLORS[name].split(', 1)').join(`, ${opacity})`);
    }
};

export default colors;
