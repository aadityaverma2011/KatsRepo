import React, { useRef, useState } from 'react';
import { Stage, Layer, Image, Text, Group } from 'react-konva';
import useImage from 'use-image';
import "./EditTemplate.css";

const EditTemplate = ({ template, user, onClose }) => {
    const stageRef = useRef(null);
    const [bgImage] = useImage(template.image_url, 'Anonymous');
    const [profileImage] = useImage(user.imageUrl, 'Anonymous');
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const [namePos, setNamePos] = useState({ x: 50, y: 220 });
    const [imgScale, setImgScale] = useState(1);
    const [imgOpacity, setImgOpacity] = useState(1);
    const [nameSize, setNameSize] = useState(32);
    const [nameOpacity, setNameOpacity] = useState(1);
    const [nameColor, setNameColor] = useState('#ffffff');

    const handleDownload = () => {
        const uri = stageRef.current.toDataURL();
        const link = document.createElement('a');
        link.download = `kats-repo-${template.title}.png`;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="edit-overlay">
            <div className="edit-container">
                <div className="edit-header">
                    <span className="edit-title">Studio: {template.title}</span>
                    <div className="edit-actions">
                        <button className="download-btn" onClick={handleDownload}>Download PNG</button>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                </div>

                <div className="editor-layout">
                    <aside className="editor-controls">
                        <div className="control-section">
                            <h3>Profile Image</h3>
                            <div className="control-group">
                                <label>Size</label>
                                <input type="range" min="0.5" max="2" step="0.1" value={imgScale} onChange={(e) => setImgScale(parseFloat(e.target.value))} />
                            </div>
                            <div className="control-group">
                                <label>Opacity</label>
                                <input type="range" min="0" max="1" step="0.05" value={imgOpacity} onChange={(e) => setImgOpacity(parseFloat(e.target.value))} />
                            </div>
                        </div>
                        <div className="control-section">
                            <h3>Text Style</h3>
                            <div className="control-group">
                                <label>Font Size</label>
                                <input type="range" min="12" max="72" step="1" value={nameSize} onChange={(e) => setNameSize(parseInt(e.target.value))} />
                            </div>
                            <div className="control-group">
                                <label>Text Color</label>
                                <input type="color" value={nameColor} onChange={(e) => setNameColor(e.target.value)} />
                            </div>
                            <div className="control-group">
                                <label>Opacity</label>
                                <input type="range" min="0" max="1" step="0.05" value={nameOpacity} onChange={(e) => setNameOpacity(parseFloat(e.target.value))} />
                            </div>
                        </div>
                    </aside>

                    <div className="canvas-wrapper">
                        <Stage width={800} height={500} ref={stageRef} className="konva-stage">
                            <Layer>
                                {bgImage && (
                                    <Image image={bgImage} width={800} height={500} listening={false} />
                                )}

                                <Group
                                    draggable
                                    x={pos.x}
                                    y={pos.y}
                                    scaleX={imgScale}
                                    scaleY={imgScale}
                                    opacity={imgOpacity}
                                    onDragEnd={(e) => setPos({ x: e.target.x(), y: e.target.y() })}
                                >
                                    {profileImage && (
                                        <Image
                                            image={profileImage}
                                            width={150}
                                            height={150}
                                            cornerRadius={75}
                                            stroke="#fff"
                                            strokeWidth={5 / imgScale}
                                            shadowBlur={10}
                                        />
                                    )}
                                </Group>

                                <Text
                                    text={user.fullName}
                                    fontSize={nameSize}
                                    fontStyle="bold"
                                    fill={nameColor}
                                    x={namePos.x}
                                    y={namePos.y}
                                    opacity={nameOpacity}
                                    draggable
                                    onDragEnd={(e) => setNamePos({ x: e.target.x(), y: e.target.y() })}
                                    shadowColor="black"
                                    shadowBlur={5}
                                />
                            </Layer>
                        </Stage>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTemplate;