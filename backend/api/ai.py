# ai.py

import numpy as np
import cv2

def analyze_candlestick_section(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    candlestick_centers = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        center_y = y + h // 2
        candlestick_centers.append((x + w // 2, center_y))
    candlestick_centers = sorted(candlestick_centers, key=lambda x: x[0])
    x_coords = [point[0] for point in candlestick_centers]
    y_coords = [point[1] for point in candlestick_centers]
    if len(x_coords) > 1:
        poly_fit = np.polyfit(x_coords, y_coords, 1)
        trend_slope = poly_fit[0]
        if trend_slope < 0:
            trend = "Upward trend"
        elif trend_slope > 0:
            trend = "Downward trend"
        else:
            trend = "Sideways trend"
    else:
        trend = "Not enough candlesticks"
    return trend

def analyze_graph_sections(image_path, num_sections=3):
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    height, width = image.shape[:2]
    section_width = width // num_sections
    sections = [(i * section_width, (i + 1) * section_width) for i in range(num_sections)]
    section_trends = []
    cropped_images = []
    for section in sections:
        cropped_image = image[:, section[0]:section[1]]
        cropped_images.append(cropped_image)
        section_trend = analyze_candlestick_section(cropped_image)
        section_trends.append(section_trend)
    return section_trends, cropped_images
