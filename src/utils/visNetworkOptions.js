export const visNetworkOptions = {
    nodes: {
        borderWidth: 10,
        borderWidthSelected: 1,
        labelHighlightBold: true,
        color: {
            border: '#000'
        },
        shadow: {
            enabled: true,
            color: 'rgba(0,0,0,0.5)',
            size: 10,
            x: 0,
            y: 5
        },
    },
    edges: {
        arrows: {
            middle: {
                enabled: true,
                scaleFactor: 1,
                type: "arrow"
            },
        },
        hoverWidth: 0,
        selectionWidth: 1,
    },
    interaction: {
        hover: true,
    },
    manipulation: {
        enabled: false, // Disable node manipulation via interaction
    }
};